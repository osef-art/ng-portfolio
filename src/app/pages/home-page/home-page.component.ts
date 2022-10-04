import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Title } from '@angular/platform-browser';
import { Kind, Lang, TranslatableText } from 'src/models/models';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { CustomParserService } from 'src/app/services/custom-parser.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  intro !: TranslatableText;

  constructor(
    private titleService: Title,
    private scroller : PageScrollerService,
    private parser : CustomParserService,
  ) {
    this.titleService.setTitle("welcome.");
    AppComponent.resetPageKind();
  }

  ngOnInit() {
    HomePageComponent.buildWave(60, 60);
    this.parser.setRules({
      '<span class="white">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/,
      '<a href="/$2" routerLink="/$2" class="$2-link">$1</a>': /\[([a-zé\s]+)\]\(([a-z]+)\)/,
    });
    this.intro = this.randomIntro;
  }

  // into service
  static buildWave(w: number, h: number) {
    const a = h / 4;
    const y = h / 2;
    const m = .512286623256592433;

    const pathData = [
      'M', w * 0, y + a / 2,
      'c',
      a * m, 0,
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a
    ].join(' ');

    var path = document.querySelector('#wave');

    if (path != null) {
      path.setAttribute('d', pathData);
    }
  }

  scrollToTop() {
    this.scroller.scrollToTop();
  }

  get Kind() : typeof Kind {
    return Kind;
  }

  private randomizedNav(lang : Lang) : string {
    var sentence : string = "";
    const order : Kind[] = Object.values(Kind);
    const skills : { [key in Kind]: TranslatableText } = {
      [Kind.NONE] : new TranslatableText(),
      [Kind.ART] : new TranslatableText('designing', 'graphisme'),
      [Kind.GAMES] : new TranslatableText('game developping', 'développement'),
      [Kind.ANIMS] : new TranslatableText('animating', 'animation'),
      [Kind.MUSIC] : new TranslatableText('producing', 'composition'),
    }

    order.shift();
    order.sort( () => .5 - Math.random() );
    order.forEach(kind =>
      sentence += (
        (kind == order[order.length-1] ? new TranslatableText('and', 'ou').in(lang) + " " : "") +
        (lang == Lang.FRA ? (kind == Kind.ANIMS ? "d'" : "de ") : "") +
        ("[" + skills[kind].in(lang) + "](" + kind + ")") +
        (kind == order[order.length-1] ? " !" : ", ")
      )
    );
    return sentence;
  }

  get randomIntro() : TranslatableText {
    return new TranslatableText(
      "*glad you got there.* feel free to check \
      my latest works in terms of " +
      this.randomizedNav(Lang.ENG),
      "*content de vous voir.* venez jeter un oeil\
      à mes dernières créations en matière " +
      this.randomizedNav(Lang.FRA),
    );
  }

  get introHtml() : string {
    return this.parser.parsed(this.intro);
  }
}
