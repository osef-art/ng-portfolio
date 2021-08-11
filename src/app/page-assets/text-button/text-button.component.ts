import { Component, Input, OnInit } from '@angular/core';
import { Kind, TranslatableText } from 'src/models/models';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss']
})
export class TextButtonComponent extends IconButtonComponent implements OnInit {
  @Input() text!: string;
  displayed !: TranslatableText;

  ngOnInit() {
    super.ngOnInit();
    if (!this.text) {
      this.displayed = this.defaultButtonText(this.kind);
      return;
    }
    this.displayed = new TranslatableText(...this.text.split('|'));
  }

  defaultButtonText(kind: Kind): TranslatableText {
    switch (kind) {
      case Kind.GAMES:
        return new TranslatableText('PLAY !', 'JOUER !');
      case Kind.ART:
        return new TranslatableText('PEEK', 'OOOHH');
      case Kind.MUSIC:
        return new TranslatableText('LISTEN', 'ÉCOUTER');
      case Kind.ANIMS:
        return new TranslatableText('WATCH !', 'VOIR !');
    }
    return new TranslatableText('GO !');
  }
}
