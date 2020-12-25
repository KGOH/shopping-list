import {Course} from './Course';

export class Recipe {
    issuer = '';
    description = '';
    courses: Course[] = [new Course()];
    get course(): Course { return this.courses[0]; }
}
