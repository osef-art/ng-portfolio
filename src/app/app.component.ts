import { Component } from '@angular/core';
import { Kind, Lang } from 'src/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static pageKind : Kind = Kind.NONE;
  static language : Lang = Lang.ENG;

  constructor() {
    var currentLang = localStorage.getItem("lang");
    if (currentLang) AppComponent.language = (<any>Lang)[currentLang];
    else localStorage.setItem("lang", AppComponent.language);
  }

  static switchLanguage() {
    this.language = this.language == Lang.ENG ? Lang.FRA : Lang.ENG;
    localStorage.setItem("lang", this.language);
  }

  static resetPageKind() {
    this.pageKind = Kind.NONE;
  }

  static setPageKind(kind: Kind) {
    this.pageKind = kind;
  }
}
