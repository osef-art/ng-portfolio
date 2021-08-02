import { TextContent } from "./models";

export enum ProgLang {
  LIBGDX = "LibGDX",
  JAVA = "Java",
  JS = "Javascript",
}

export class GameCard {
  title: string;
  desc: TextContent;
  date: Date;

  isBeta: boolean = false;
  devProg: number = 0;
  languages: ProgLang[];

  url: string;
  thumbnailUrl: string;
  thumbnailAnimatedUrl!: string;

  constructor(title: string, desc: TextContent, url: string, thumbnailName: string, languages: ProgLang[], date: Date, devProg?: number) {
    this.thumbnailUrl = "assets/thumbnails/" + thumbnailName + "-tbn.png";
    if (devProg) this.devProg = devProg;
    else this.isBeta = true;
    this.url = 'games/' + url;
    this.languages = languages;
    this.title = title;
    this.desc = desc;
    this.date = date;
  }
}

export class GameCardData {
  static cards: GameCard[] = [];

  constructor() {
    GameCardData.cards = [];

    GameCardData.cards.push(
      new GameCard(
        "ministick.",
        new TextContent(
          "An addictive, infinite and super-fast beat-them all.\n\
           Let's see how far you can go !"
        ),
        "ministick",
        "ministick",
        [ProgLang.JAVA],
        new Date(Date.UTC(2020, 3, 0, 0, 0, 0)), .8
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "ministick.",
        new TextContent(
          "The very first playable version of ministick !\n\
          The controls and physics have quite changed since, but this one was\
          more focused on the different enemies abilities !"
        ),
        "ministick.html",
        "ministick-js",
        [ProgLang.JS],
        new Date(Date.UTC(2019, 9, 0, 0, 0, 0)), .6
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "TETRIS !",
        new TextContent(
          "A simple Tetris made with Javascript."
        ),
        "tetris.html",
        "tetris",
        [ProgLang.JS],
        new Date(Date.UTC(2018, 5, 0, 0, 0, 0)), 1
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "Lost in Space",
        new TextContent(
          "This was the final project I had to return in my first year\
          in computer science studies.\n It got me the maximal grade 😏"
        ),
        "lost-in-space.html",
        "lost-in-space",
        [ProgLang.JS],
        new Date(Date.UTC(2018, 4, 0, 0, 0, 0)), 1
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "ministick-moves",
        new TextContent(
          "a quick sandbox environment made to test new moves and mechanics for ministick.v2 !"
        ),
        "ministick-moves",
        "ministick-moves",
        [ProgLang.LIBGDX, ProgLang.JAVA],
        new Date(Date.UTC(2021, 2, 0, 0, 0, 0))
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "KAPS",
        new TextContent(
          "a second version of KAPS made with LibGDX. contains a bunch of new sidekicks !"
        ),
        "KAPS-2",
        "kaps-v2-3",
        [ProgLang.LIBGDX, ProgLang.JAVA],
        new Date(Date.UTC(2021, 1, 0, 0, 0, 0))
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "KAPS",
        new TextContent(
          "A 'Dr. Mario'-like colorful mini-game.\n\
          Match the colored capsules and get rid of every germ in the grid ! 🧪"
        ),
        "KAPS",
        "kaps-2",
        [ProgLang.JAVA],
        new Date(Date.UTC(2019, 12, 0, 0, 0, 0)), .5
      )
    )

    GameCardData.cards.sort((a: GameCard, b: GameCard) => {
      return b.date.getTime() - a.date.getTime();
    });
  }
}
