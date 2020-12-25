import {Schedule} from './Schedule';

export class Course {
    schedules: Schedule[] = [];
    constructor(public startDate: Date, public endDate: Date) { }
}
