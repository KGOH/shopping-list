import {Drug} from './Drug';

export class Schedule {
  public drug: Drug | undefined = undefined;
  public dayOffset = 0;

  public constructor() {
  }
}

export class Dosage {
  public count = 1;
  public unit = UnitType.Tablet;
}

export class ScheduleEvent {
  public type: ScheduleEventType = ScheduleEventType.Breakfast;
  public dosage: Dosage = new Dosage();
  public repeatInterval = 1;
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
