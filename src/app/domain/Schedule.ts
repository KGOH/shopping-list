import {Drug} from './Drug';

export class Schedule {
  public drug: Drug | undefined = undefined;
  public dayOffset = 0;
  public events: ScheduleEvent[] = [];

  public constructor() {
  }
}

export class Dosage {
  public count = 1;
  public unit = UnitType.Tablet;
}

export class ScheduleEvent {
  public type: ScheduleEventType = ScheduleEventType.Breakfast;
  public timeOffset = 0; // in minutes: -1 minute - before, +1 minute - after, 0 minutes - with meal, >1, <-1 - explicit minutes
  public timeOfDay: number | undefined = undefined; // if provided then explicit time in hours
  public repeatInterval = 1; // in days, 1 - every day, 2 - every two days
  public dosage: Dosage = new Dosage();
}

export enum UnitType {
  Tablet,
  Capsule
}

export enum ScheduleEventType {
  Breakfast,
  Lunch,
  Dinner,
  Supper
}
