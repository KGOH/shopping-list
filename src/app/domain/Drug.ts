import {Dosage} from './Schedule';

export class Drug {
  constructor(public id: number, public name: string, public englishName: string) {
  }
}

export class DrugPackage {
  public drug!: Drug;
  public dosage!: Dosage;
}
