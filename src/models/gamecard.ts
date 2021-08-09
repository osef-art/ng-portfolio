import { TextContent } from "./models";

export enum ProgLang {
  LIBGDX = "LibGDX",
  JAVA = "Java",
  JS = "Javascript",
}

export class GameCard {
  id: string;
  title: string;
  desc: TextContent;
  date: Date;

  isBeta: boolean = false;
  devProg: number = 0;
  languages: ProgLang[];

  link: string;
  thumbnailUrl: string;
  thumbnailAnimatedUrl!: string;

  constructor(id: string, title: string, desc: TextContent, path: string, languages: ProgLang[], date: Date, devProg?: number, thumbUrl?: string) {
    this.thumbnailUrl = "assets/thumbnails/" + (thumbUrl ? thumbUrl : path) + "-tbn.png";
    this.date = date;this.languages = languages;
    if (devProg) this.devProg = devProg;
    else this.isBeta = true;
    this.title = title;
    this.desc = desc;
    this.id = id;

    if (this.isJsGame) {
      this.link = "/js-games/" + path;
    } else {
      this.link = "https://github.com/osef-art/" + path + "/archive/refs/heads/main.zip"
    }
  }

  get isJsGame() : boolean {
    return this.languages.includes(ProgLang.JS);
  }
}

export class GameCardData {
  static cards: GameCard[] = [];

  constructor() {
    GameCardData.cards = [];

    GameCardData.cards.push(
      new GameCard(
        "ministick", "ministick.",
        new TextContent(
          "An addictive, infinite and super-fast beat-them all.\n\
           Let's see how far you can go !",
           "Un 'beat-them-all' assez rapide et nerveux.\n\
           Jusqu'où tiendrez-vous ? 👀"
        ),
        "ministick",
        [ProgLang.JAVA],
        new Date(Date.UTC(2020, 3, 0, 0, 0, 0)), .8
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "ministick-js", "ministick.",
        new TextContent(
          "The very first playable version of ministick !\n\
          The controls and physics have quite changed since, but this one was\
          more focused on the different enemies abilities !",
          "Alors ça, c'était la toute première version de ministick !\n\
          Les contrôles et l'environnement ont beaucoup changé depuis,\n\
          mais j'ai pu tester pas mal de trucs en terme de code."
        ),
        "ministick/ministick.html",
        [ProgLang.JS],
        new Date(Date.UTC(2019, 9, 0, 0, 0, 0)), .6,
        "ministick-js",
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "tetris", "TETRIS !",
        new TextContent(
          "A simple Tetris made with Javascript (i was bored)",
          "Un petit Tetris fait en Javascript. Je m'ennuyais."
        ),
        "TETRIIIS/tetris.html",
        [ProgLang.JS],
        new Date(Date.UTC(2018, 5, 0, 0, 0, 0)), 1,
        "tetris",
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "lost-in-space", "Lost in Space",
        new TextContent(
          "This space shooter was the final project I had to return in my first year\
          in computer science studies.\n It got me the maximal grade 😏",
          "Ce shooter est le projet final que je devais rendre à la fin de ma première\
          année de licence.\n Ouais j'ai eu 20 ouais. 😏"
        ),
        "lost_in_space/lost_in_space.html",
        [ProgLang.JS],
        new Date(Date.UTC(2018, 4, 0, 0, 0, 0)), 1,
        "lost-in-space",
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "ministick-moves", "ministick-moves",
        new TextContent(
          "a quick sandbox environment made to test new moves and mechanics for ministick.v2 !",
          "un petit environnement me servant de bac à sable pour tester des mécaniques et la\
          physique de la prochaine version de ministick !"
        ),
        "ministick-moves",
        [ProgLang.LIBGDX, ProgLang.JAVA],
        new Date(Date.UTC(2021, 2, 0, 0, 0, 0))
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "KAPS", "KAPS",
        new TextContent(
          "a second version of KAPS made with LibGDX. contains a bunch of new sidekicks !",
          "une autre version de KAPS utilisant une librairie différente et avec un code plus optimisé.\n\
          pas mal de nouveaux sidekicks ont été ajoutés !"
        ),
        "kaps-libgdx",
        [ProgLang.LIBGDX, ProgLang.JAVA],
        new Date(Date.UTC(2021, 1, 0, 0, 0, 0))
      )
    )

    GameCardData.cards.push(
      new GameCard(
        "kaps-libgdx", "KAPS",
        new TextContent(
          "A 'Dr. Mario'-like colorful mini-game.\n\
          Match the colored capsules and get rid of every germ in the grid\
          with the help of your awesome sidekicks ! 🧪",
          "KAPS est un mini-jeu à la 'Dr. Mario' où tu dois débarasser la\
          grille de tous les virus avec l'aide de tes gélules et tes sidekicks géniaux ! 🧪"
        ),
        "kaps",
        [ProgLang.JAVA],
        new Date(Date.UTC(2019, 12, 0, 0, 0, 0)), .8
      )
    )

    GameCardData.cards.sort((a: GameCard, b: GameCard) => {
      return b.date.getTime() - a.date.getTime();
    });
  }
}
