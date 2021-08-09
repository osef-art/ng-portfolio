import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GameCard, ProgLang } from 'src/models/gamecard';
import { MdToHtmlParserService } from 'src/app/services/md-to-html-parser.service';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { AppComponent } from 'src/app/app.component';
import { Kind } from 'src/models/models';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input() game!: GameCard;

  constructor(private datepipe: DatePipe, private parser : MdToHtmlParserService, scroller : PageScrollerService) {
    scroller.scrollToTop();
    parser.addRules({
      '$1 <br>\r': /(.*)\n/
    });
  }

  get Kind(): typeof Kind {
    return Kind;
  }

  get gameDesc() {
    return this.parser.parsed(this.game.desc.in(AppComponent.language));
  }

  get formattedDate() {
    return this.datepipe.transform(this.game.date, 'MMM. yyyy');
  }

  langURL(lang: ProgLang): string {
    switch (lang) {
      case ProgLang.JAVA:
        return "https://www.buildateam.io/wp-content/uploads/2018/07/logo-java.png";
      case ProgLang.JS:
        return "https://cdn.filestackcontent.com/6ZrIEmWRgycFn9smUNzN";
      case ProgLang.LIBGDX:
        return "https://libgdx.com/assets/brand/stacked_dark.png";
    }
  }
}
