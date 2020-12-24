import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '../../domain/Schedule';
import {Drug} from '../../domain/Drug';
import {from, Observable} from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() public schedule!: Schedule;
  public filteredDrugs: Observable<Drug[]> = from([]);
  constructor() { }

  ngOnInit(): void {
    this.filteredDrugs = from([[new Drug('Аспирин'), new Drug('Активированный уголь')]]);
  }

}
