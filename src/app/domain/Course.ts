import {Schedule} from './Schedule';

export class Course {
    startDate: Date|undefined;
    endDate: Date|undefined;
    schedules: Schedule[] = [];
    constructor() { }
}
