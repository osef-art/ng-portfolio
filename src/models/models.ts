import { AppComponent } from "src/app/app.component";

export enum Kind {
  NONE = "",
  ART = "art",
  GAMES = "games",
  ANIMS = "anims",
  MUSIC = "music"
}

export enum Lang {
  ENG = "ENG", FRA = "FRA",
}

export class TranslatableText {
  private text: { [key in Lang]: string } = { FRA: "", ENG: "" };

  constructor(...text: string[]) {
    var langArray = Object.values(Lang);
    for (let i = 0; i < langArray.length; i++) {
      this.text[langArray[i]] = text[i];
    }
  }

  static translated(kind: Kind) : string {
    const kinds : { [key in Kind]: TranslatableText } = {
      [Kind.NONE] : new TranslatableText(),
      [Kind.ART] : new TranslatableText(Kind.ART, "dessins"),
      [Kind.GAMES] : new TranslatableText(Kind.GAMES, "jeux"),
      [Kind.ANIMS] : new TranslatableText(Kind.ANIMS),
      [Kind.MUSIC] : new TranslatableText(Kind.MUSIC, "musique"),
    }
    return kinds[kind].translated();
  }

  translated() : string {
    return this.in(AppComponent.language);
  }

  in(lang: Lang): string {
    return this.text[lang] ? this.text[lang] : this.text[Lang.ENG];
  }
}

export class ThumbnailData {
  private data: { [key: string]: string[] } = {};

  constructor() {
    ["ministick", "ministick2"].forEach(id => {
      this.data[id] = [];
      for (let n = 0; n < 3; n++)
        this.data[id].push("assets/thumbnails/" + id + "-clip-" + (n + 1) + ".gif")
    });
    ["kaps-beta"].forEach(id => {
      this.data[id] = [];
      for (let n = 0; n < 6; n++)
        this.data[id].push("assets/thumbnails/kaps-clip-" + (n + 1) + ".gif")
    });
    this.data["kaps-beta"].push("assets/thumbnails/kaps-clip-sdks.gif")
    this.data["collab"] = ["assets/thumbnails/potsdealer.png"];
  }

  from(key: string): string[] {
    return this.data[key];
  }
}
