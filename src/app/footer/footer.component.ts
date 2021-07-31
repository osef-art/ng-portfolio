import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  get mainLang() {
    return AppComponent.language;
  }

  switchLanguage() {
    AppComponent.switchLanguage();
    AppComponent.scrollToTop();
  }
}
