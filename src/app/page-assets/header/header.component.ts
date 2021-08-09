import { Component } from '@angular/core';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private scroller : PageScrollerService) {}

  get kind() {
    return AppComponent.pageKind;
  }

  scrollToTop() {
    this.scroller.scrollToTop();
  }
}
