import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../calendar.service';

export class Day {
  date: Date;
  title: string;

  constructor(date: Date, title: string) {
    this.date = date;
    this.title = title;
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days: Day[] = [];

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.days = [new Day(today, 'Сегодня'), new Day(tomorrow, 'Завтра')];
  }
}
