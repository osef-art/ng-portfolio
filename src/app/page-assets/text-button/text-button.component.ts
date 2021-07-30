import { Component, Input, OnInit } from '@angular/core';
import { Kind } from 'src/models/models';

@Component({
  selector: 'text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss']
})
export class TextButtonComponent implements OnInit {
  @Input() kind: Kind = Kind.NONE;
  @Input() text!: string;
  @Input() innerContent!: string;
  @Input() link!: string;

  ngOnInit(): void {
    if (!this.text) {
      this.text = this.defaultButtonText(this.kind);
    }
    if (!this.innerContent) {
      this.innerContent = this.defaultInnerContent(this.kind);
    }
    if (!this.link) {
      this.link = this.kind;
    }
  }

  get linkIsURL(): boolean {
    return /https:\/\/.+/.test(this.link);
  }

  get innerContentIsImg(): boolean {
    return this.innerContent.includes("/");
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

  defaultInnerContent(kind: Kind): string {
    switch (kind) {
      case Kind.GAMES:
      case Kind.ANIMS:
      case Kind.MUSIC:
        return 'assets/icons/play-icon.png'
      case Kind.ART:
        return '👀'
    }
    return '👉';
  }
}
