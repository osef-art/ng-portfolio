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

export class TextContent {
  private text: { [key in Lang]: string; } = {
    FRA: "",
    ENG: ""
  };

  constructor(...text: string[]) {
    var langArray = Object.values(Lang);
    for (let i = 0; i < langArray.length; i++) {
      this.text[langArray[i]] = text[i];
    }
  }

  in(lang: Lang): string {
    return this.text[lang];
  }
}

export class URLsData {
  data: { [key: string]: string[] } = {};

  constructor() {
    ["ministick", "ministick2"].forEach(id => {
      this.data[id] = [];
      for (let n = 0; n < 3; n++) {
        this.data[id].push("assets/thumbnails/" + id + "-clip-" + (n + 1) + ".gif")
      }
    });
    this.data["art"] = ['canyon.jpg', 'mountains2.jpg', 'smoke.jpg', 'padami1.png'].map(name => "assets/wallpapers/" + name);
    this.data["collab"] = ["assets/thumbnails/potsdealer.png"];
  }

  from(key: string): string[] {
    return this.data[key];
  }
}
