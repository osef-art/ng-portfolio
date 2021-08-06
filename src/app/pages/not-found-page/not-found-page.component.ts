import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("nope. not here");
    AppComponent.scrollToTop();
  }
}
