import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("games.");
  }
}
