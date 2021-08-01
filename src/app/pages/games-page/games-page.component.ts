import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { GameCard, GameCardData } from 'src/models/gamecard';
import { Kind } from 'src/models/models';

@Component({
  selector: 'games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent {
  pinnedGames : GameCard[] = [];
  gameList : GameCard[] = [];

  constructor(private titleService: Title) {
    new GameCardData();
    this.pinnedGames = GameCardData.cards.slice(0, 4);
    this.gameList = GameCardData.cards;
    this.titleService.setTitle("games.");
    AppComponent.setPageKind(Kind.GAMES);
  }
}
