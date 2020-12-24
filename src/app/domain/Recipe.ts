import {Course} from './Course';

export class Recipe {
    public issuer: string|undefined = undefined;
    public description: string|undefined = undefined;
    public courses: Course[] = [];
}
