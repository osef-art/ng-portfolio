import { Component, Input, OnInit } from '@angular/core';
import { Kind } from 'src/models/models';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss']
})
export class TextButtonComponent extends IconButtonComponent implements OnInit {
  @Input() text!: string;

  ngOnInit() {
    super.ngOnInit();
    if (!this.text) {
      this.text = this.defaultButtonText(this.kind);
    }
  }

  defaultButtonText(kind: Kind): string {
    switch (kind) {
      case Kind.GAMES:
        return 'PLAY !'
      case Kind.ART:
        return 'PEEK'
      case Kind.MUSIC:
        return 'LISTEN'
      case Kind.ANIMS:
        return 'WATCH !'
    }
    return 'GO !';
  }
}
