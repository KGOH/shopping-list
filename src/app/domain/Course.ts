import {Schedule} from './Schedule';

export class Course {
    startDate = new Date();
    endDate: Date|undefined;
    schedules: Schedule[] = [];
    constructor() { }
}
