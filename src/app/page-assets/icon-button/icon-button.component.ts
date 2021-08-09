import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Kind } from 'src/models/models';

@Component({
  selector: 'icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  @Input() kind !: Kind;
  @Input() link !: string;
  @Input() icon !: string;
  @Input() label : boolean = false;
  triggered: boolean = false;

  ngOnInit() {
    if (!this.kind) {
      this.kind = AppComponent.pageKind;
    }

    if (!this.icon) {
      this.icon = this.defaultIcon(this.kind);
    }

    if (!this.isURL(this.icon) && this.icon.length > "🍆".length) {
      this.icon = 'assets/icons/' + this.icon + '-icon.png';
    }

    if (!this.link) {
      this.link = this.kind;
    }
  }

  get isNavLink(): boolean {
    return this.link.includes('/');
  }

  get iconIsImg(): boolean {
    return this.icon.includes("/");
  }

  isURL(link : string): boolean {
    return link.includes("http");
  }

  defaultIcon(kind: Kind): string {
    switch (kind) {
      case Kind.GAMES:
      case Kind.ANIMS:
      case Kind.MUSIC:
        return 'play'
      case Kind.ART:
        return '👀'
    }
    return '👉';
  }

  get buttonLabel() : string {
    if (AppComponent.pageKind) {
      return "Return to " + AppComponent.pageKind;
    }
    return "Previous page";
  }

  get returnLink() : string {
    if (AppComponent.pageKind) {
      return '/' + this.kind;
    }
    return '../';
  }
}
