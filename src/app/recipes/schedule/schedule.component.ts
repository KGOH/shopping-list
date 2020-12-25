import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '../../domain/Schedule';
import {Drug} from '../../domain/Drug';
import {from, Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {mergeMap, startWith} from 'rxjs/operators';
import {DrugService} from '../../drug.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() public schedule!: Schedule;
  private drugControl = new FormControl();
  public form = new FormGroup({
    drug: this.drugControl
  });
  public filteredDrugs: Observable<Drug[]> = from([[]]);
  constructor(private drugService: DrugService) { }

  ngOnInit(): void {
    this.filteredDrugs = this.drugControl.valueChanges.pipe(
      startWith(''),
      mergeMap(value => this.drugService.searchByName(value))
    );
  }
  public drugName(drug: Drug): string {
    return drug && drug.name;
  }
}
