import { Component, Input } from '@angular/core';
import { Kind } from 'src/models/models';

@Component({
  selector: 'icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() kind : Kind = Kind.NONE;
  @Input() link !: string;
  @Input() icon !: string;

  ngOnInit(): void {
    if (!this.icon) {
      this.icon = this.defaultIcon(this.kind);
    }
    if (!this.link) {
      this.link = this.kind;
    }
  }

  get linkIsURL(): boolean {
    return /https:\/\/.+/.test(this.link);
  }

  get iconIsImg(): boolean {
    return this.icon.includes("/");
  }

  defaultIcon(kind: Kind): string {
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
