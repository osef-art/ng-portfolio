import { Component } from '@angular/core';
import { Lang } from 'src/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}
