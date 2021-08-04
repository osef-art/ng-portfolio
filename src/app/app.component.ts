import { Component } from '@angular/core';
import { Kind, Lang } from 'src/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static pageKind : Kind = Kind.NONE;
  static language : Lang = Lang.ENG;

  static switchLanguage() {
    this.language = this.language == Lang.ENG ? Lang.FRA : Lang.ENG;
  }

  static scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos * 3 / 4);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 8);
  }

  static resetPageKind() {
    this.pageKind = Kind.NONE;
  }

  static setPageKind(kind: Kind) {
    this.pageKind = kind;
  }
}
