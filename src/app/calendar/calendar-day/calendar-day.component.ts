import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent, CalendarService} from '../calendar.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() title = 'Сегодня';
  calendarEvents: CalendarEvent[] = [];

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarEvents = this.calendarService.getCalendarEvents(this.date);
  }

}
