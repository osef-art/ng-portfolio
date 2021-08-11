import { Component } from '@angular/core';
import { CustomParserService as CustomParserService } from 'src/app/services/custom-parser.service';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { TranslatableText } from 'src/models/models';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private scroller: PageScrollerService, private parser: CustomParserService) {
    parser.setRules({
      '<h3>$1</h3>\r<div class="text">\r<p>': /### (.+)\n/,
      '<h2>$1</h2>\r': /## (.+)\s/,
      '<u>$1</u>': /_([^\s]([^_]+)[^\s])_/,
      '<span class="white">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/,
      '$1<br>\r': /(.*)\n/,
      '\r</p>\r</div>': /\\\\/
    });
  }

  get mainLang() {
    return AppComponent.language;
  }

  get switchMsg() {
    return new TranslatableText('Passer en français !', 'Switch to English !').translated();
  }

  switchLanguage() {
    AppComponent.switchLanguage();
    this.scroller.scrollToTop();
  }

  get cautionMessage() : string {
    return this.parser.parsed(new TranslatableText(
      "## CAUTION\
      ### This website is still under construction.\n\
      _I'm currently working on this site interface and content._\n\
      New stuff should be added soon.\n\
      *Don't hesitate to check out regularly and see when new content is added !*\n\n\
      Please don't mind the fact that some *key-content* may be missing.\
      However, if you notice some *disfunctionments/issues* in what is currently\
      displayed, I would appreciate you to *contact me*. _I put a few links below !_\n\
      Also, any kind of *feedback* would be really appreciated ✨ *enjoy your stay* ! :D\\\\",
      "## ATTENTION\
      ### Ce site est en cours de construction.\n\
      _Je suis toujours en train de travailler sur les visuels et le contenu du site._\n\
      Du nouveau contenu (traductions, dessins, articles) devraient bientôt arriver.\n\
      *N'hésitez pas à checkez régulièrement le site pour voir ce qui a bougé !*\n\n\
      S'il manque du contenu (comme des pages entières ou des traductions) c'est normal, ne faites pas attention.\n\
      Par contre, si vous relevez des *problèmes d'affichage*, des *bugs* ou des *fautes*, ça m'intéresse.\
      N'hésitez pas à *me contacter* si c'est le cas. _J'ai mis quelques liens en dessous !_\n\
      D'ailleurs, n'importe quel genre de *conseil*/*feedback* me ferait archi plaisir. ✨\n\
      *mettez-vous à l'aise* ! :D\\\\",
    ));
  }
}
