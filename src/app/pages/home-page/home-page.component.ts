import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Title } from '@angular/platform-browser';
import { Kind } from 'src/models/models';
import { PageScrollerService } from 'src/app/services/page-scroller.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private titleService: Title, private scroller : PageScrollerService) {
    this.titleService.setTitle("welcome.");
    AppComponent.resetPageKind();
  }

  ngOnInit() {
    HomePageComponent.buildWave(60, 60);
  }

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
}
