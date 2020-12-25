import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../domain/Recipe';
import {FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.scss']
})
export class RecipeDataComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Output() save = new EventEmitter<void>();

  form = new FormGroup({
    issuer: new FormControl(),
    description: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
    this.form.setValue({issuer: this.recipe.issuer, description: this.recipe.description});
  }

  public onSubmit(): void {
    Object.assign(this.recipe, this.form.value);
    this.save.emit();
  }

  doSubmit(): void {
    this.onSubmit();
  }
}
