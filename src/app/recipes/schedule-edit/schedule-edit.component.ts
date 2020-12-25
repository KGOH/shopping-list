import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Schedule, ScheduleEvent} from '../../domain/Schedule';
import {Drug, DrugPackage} from '../../domain/Drug';
import {from, Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {DrugService} from '../../drug.service';
import {ScheduleService} from '../schedule.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {
  @Output() createSchedule = new EventEmitter<Schedule>();
  @Output() createScheduleEvent = new EventEmitter<ScheduleEvent>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('scheduleInput', { read: MatAutocompleteTrigger }) scheduleAutocompleteTrigger!: MatAutocompleteTrigger;

  schedule = new Schedule();
  private drugPackage: DrugPackage = new DrugPackage();
  private drugControl = new FormControl();
  public scheduleControl = new FormControl();
  public form = new FormGroup({
    drug: this.drugControl
  });
  public filteredDrugs: Observable<Drug[]> = from([[]]);
  public filteredSchedules: Observable<[string, string][]> = from([]);
  constructor(private drugService: DrugService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.filteredDrugs = this.drugControl.valueChanges.pipe(
      startWith(''),
      mergeMap(value => this.drugService.searchByName(value))
    );
    this.filteredSchedules = this.scheduleControl.valueChanges.pipe(
      startWith(this.scheduleControl.value as string || ''),
      map(value => this.scheduleService.generateSuggestions(value))
    );
  }
  public drugName(drug: Drug): string {
    return drug && drug.name;
  }

  checkCancel(ignore: boolean): void {
    if (!ignore) {
      this.cancel.emit();
    }
  }
  onScheduleSelected(): void {
    window.requestAnimationFrame(() => {
      this.checkAutoAddScheduleEvent();
      this.scheduleAutocompleteTrigger.openPanel();
    });
  }
  checkAutoAddScheduleEvent(): void {
    if (this.drugControl.value && this.scheduleService.generateSuggestions(this.scheduleControl.value).length === 0) {
      this.drugPackage = {drug: this.drugControl.value} as DrugPackage;
      const schedule = this.scheduleService.createScheduleEvent(this.scheduleControl.value);
      this.createScheduleEvent.emit(schedule);
      this.scheduleControl.setValue('');
    }
  }
  onSubmit(): void {
    this.createSchedule.emit(this.schedule);
  }
}
