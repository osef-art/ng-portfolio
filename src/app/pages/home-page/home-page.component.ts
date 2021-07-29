import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Kind } from 'src/models/models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  eKind = Kind;

  constructor(private titleService: Title) {
    this.titleService.setTitle("welcome.");
  }

  ngOnInit(): void {
    this.buildWave(60, 60);
  }

  buildWave(w: number, h: number) {
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
}
