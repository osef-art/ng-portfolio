export enum Kind {
  NONE = "",
  ART = "art",
  GAMES = "games",
  ANIMS = "anims",
  MUSIC = "music"
}

export enum Lang {
  ENG, FRA,
}

export class TextContent {
  langs : {[key in Lang]: string;} = {0:"", 1: ""};

  constructor(...text : string[]) {
    var enumArray = Object.keys(Lang);

    for (let i : Lang = 0; i < enumArray.length; i++) {
      this.langs[i] = text[i];
    }
  }

  in(lang : Lang) : string {
    return this.langs[lang];
  }
}

export class URLsData {
  data : { [name: string]: string[] } = {};

  constructor() {
    ["ministick", "ministick2"].forEach(id => {
      this.data[id] = [];
      for (let n = 0; n < 3; n++) {
        this.data[id].push("assets/thumbnails/" + id + "-clip-" + (n+1) + ".gif")
      }
    });
    this.data["art"] = ['canyon.jpg', 'mountains2.jpg', 'smoke.jpg', 'padami1.png'].map(name => "assets/wallpapers/" + name);
  }

  from(key : string) : string[] {
    return this.data[key];
  }
}

export class Article {
  title: string;
  date: Date;
  content: string;
  // new Date(Date.UTC(currentYear + 1, 6, 1, -2, 0, 0))
  thumbnails: string[];

  constructor(title: string, content: string, date: Date, thumbnails: string[]) {
    this.title = title;
    this.date = date;
    this.thumbnails = thumbnails;
    this.content = content;
  }
}

export default class ArticlesData {
  titles : { [name: string] : TextContent} = {};
  contents : { [name: string] : TextContent} = {};
  static articles : { [name: string]: Article } = {};
  ids : string[] = ['ministick', 'ministick2', 'collab'];

  constructor() {
    this.titles['ministick'] = new TextContent(
      "my latest game: *ministick*",
      "mon tout dernier jeu: *ministick*",
    )
    this.contents['ministick'] = new TextContent(
      "One of the projects I'm the most proud of.\n\
      Chain *combos* and smash innocent guys in this\
      *colorful* and *addicting* beat-them all.\n\
      *How far* can you get ? 💨",

      "Un de mes projets préférés.\n\
      Enchaînez les *combos* et dégommez des gens\
      *parfaitement innocents* dans ce *'beat-them-all'* assez addictif.\n\
      *Jusqu'où* pourrez-vous aller ? 💨"
    );
    this.titles['ministick2'] = new TextContent(
      "working on... *ministick 2* !",
      "*ministick 2* en préparation !",
    )
    this.contents['ministick2'] = new TextContent(
      "Since the game had a lot of success among my friends,\
       I have started to upgrade it to a *next level*.\n\
      I'm planning to make the game more *clever* and implement\
       more precise *fighting*/*combo* mechanics.\n\
      I've already *smoothen* the animation and added a bunch of *new moves* !\n\
      Stay tuned 👀",

      "Vu comment mes potes s'étaient enjaillés sur la\
      première version, j'ai commencé à travailler sur\
      une version plus poussée de ministick.\n\
      L'idéal, ce serait de rendre le jeu beaucoup plus\
      technique à maîtriser, avec des mécaniques et des combos uniques.\n\
      J'ai déjà dessiné des animation plus fluides ainsi\
      que plein de nouveaux moves que vous pouvez tester tout de suite !!\n\
      Hésitez pas à check le Github 👀"
    );

    ArticlesData.articles['ministick'] = new Article(
      this.titleFrom('ministick', Lang.ENG),
      this.contentFrom('ministick', Lang.ENG),
      new Date(Date.UTC(2021, 2, 27, -2, 0, 0)),
      new URLsData().from('ministick')
    );

    ArticlesData.articles['ministick2'] = new Article(
      this.titleFrom('ministick2', Lang.ENG),
      this.contentFrom('ministick2', Lang.ENG),
      new Date(Date.UTC(2021, 3, 1, 0, 0, 0)),
      new URLsData().from('ministick2')
    );
  }

  static get(key : string) : Article {
    return ArticlesData.articles[key];
  }

  titleFrom(key : string, lang : Lang) : string {
    return this.titles[key].in(lang);
  }

  contentFrom(key : string, lang : Lang) : string {
    return this.contents[key].in(lang);
  }
}
