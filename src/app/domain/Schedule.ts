import {Drug} from './Drug';

export abstract class Schedule {
    protected constructor(public drug: Drug, public startDate: Date) { }
}

export class DailySchedule {

}
