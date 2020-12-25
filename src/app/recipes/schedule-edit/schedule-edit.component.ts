import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Schedule} from '../../domain/Schedule';
import {Drug} from '../../domain/Drug';
import {from, Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {DrugService} from '../../drug.service';
import {ScheduleService} from '../schedule.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {
  @Input() public schedule!: Schedule;
  @ViewChild('scheduleInput', { read: MatAutocompleteTrigger }) scheduleAutocompleteTrigger!: MatAutocompleteTrigger;

  private lastSuggestions: [string, string][] = [];
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
      map(value => {
        this.lastSuggestions = this.scheduleService.generateSuggestions(value);
        return this.lastSuggestions;
      })
    );
  }
  public drugName(drug: Drug): string {
    return drug && drug.name;
  }

  onScheduleSelected(): void {
    window.requestAnimationFrame(() => {
      this.checkAutoSubmit();
      this.scheduleAutocompleteTrigger.openPanel();
    });
  }
  checkAutoSubmit(): void {
    if (this.drugControl.value && this.scheduleService.generateSuggestions(this.scheduleControl.value).length === 0) {
      console.log('submit!');
    }
  }
}
