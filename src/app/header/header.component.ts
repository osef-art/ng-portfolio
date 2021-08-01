import { Component, Input } from '@angular/core';
import { Kind } from 'src/models/models';
import { AppComponent } from '../app.component';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  get kind() {
    return AppComponent.pageKind;
  }

  scrollToTop() {
    AppComponent.scrollToTop();
  }
}
