import {Schedule} from './Schedule';

export class Course {
    schedules: Schedule[] = [new Schedule()];
    constructor(public startDate: Date, public endDate: Date) { }
}
