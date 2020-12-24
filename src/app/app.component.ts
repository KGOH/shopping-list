import {AfterContentInit, Component} from '@angular/core';

declare const shopping_list: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'shopping-list';

  ngAfterContentInit(): void {
  }
}
