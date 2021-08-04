import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Kind } from 'src/models/models';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
  constructor() {
    AppComponent.scrollToTop();
  }

  get buttonLabel() : string {
    if (AppComponent.pageKind != Kind.NONE) {
      return "Return to " + AppComponent.pageKind;
    }
    return "Previous page";
  }
}
