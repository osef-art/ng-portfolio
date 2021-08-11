import { Component } from '@angular/core';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { Kind, TranslatableText } from 'src/models/models';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  kinds : Kind[] = Object.values(Kind);

  constructor(private scroller : PageScrollerService) {
    this.kinds.shift();
    this.kinds.splice(2, 0, Kind.NONE);
  }

  get pageKind() {
    return AppComponent.pageKind;
  }

  scrollToTop() {
    this.scroller.scrollToTop();
  }

  label(kind: Kind) : string {
    return TranslatableText.translated(kind);
  }
}
