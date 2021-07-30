import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  scrollToTop() {
    AppComponent.scrollToTop();
  }
}
