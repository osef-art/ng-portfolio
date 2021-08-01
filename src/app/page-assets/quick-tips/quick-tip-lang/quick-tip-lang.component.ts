import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Lang } from 'src/models/models';

@Component({
  selector: 'quick-tip-lang',
  templateUrl: './quick-tip-lang.component.html',
  styleUrls: ['./quick-tip-lang.component.scss']
})
export class QuickTipLangComponent {
  pressed : boolean = false;

  get Lang(): typeof Lang {
    return Lang;
  }

  get mainLang(): Lang {
    return AppComponent.language;
  }

  get langKeys(): Lang[] {
    return Object.values(Lang);
  }

  setLanguage(lang : Lang) {
    AppComponent.language = lang;
    this.pressed = true
  }
}
