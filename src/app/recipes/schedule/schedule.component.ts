import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '../../domain/Schedule';
import {Drug} from '../../domain/Drug';
import {from, Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {filter} from 'lodash-es';

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
  constructor() { }

  ngOnInit(): void {
    this.filteredDrugs = this.drugControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  public drugName(drug: Drug): string {
    return drug && drug.name;
  }
  private _filter(value: string): Drug[] {
    return filter([new Drug('Аспирин'), new Drug('Активированный уголь')], x => x.name.startsWith(value));
  }
}
