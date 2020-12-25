import {AfterContentChecked, AfterContentInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare const shopping_list: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'shopping-list';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }


  ngAfterContentInit(): void {
  }
}
