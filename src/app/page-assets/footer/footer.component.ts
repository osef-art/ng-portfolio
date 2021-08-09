import { Component } from '@angular/core';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private scroller: PageScrollerService) {}

  get mainLang() {
    return AppComponent.language;
  }

  switchLanguage() {
    AppComponent.switchLanguage();
    this.scroller.scrollToTop();
  }
}
