import { Component, Input } from '@angular/core';
import { Kind } from 'src/models/models';

@Component({
  selector: 'text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss']
})
export class TextButtonComponent {
  @Input() kind : Kind = Kind.NONE;
  @Input() text !: string;
  @Input() link !: string;
  @Input() innerContent !: string;
  accentSuffix : string = '-text-button';

  get linkIsURL() : boolean {
    return /https:\/\/.+/.test(this.link);
  }

  get innerContentIsImg() : boolean {
    return this.innerContent.includes("/");
  }
}
