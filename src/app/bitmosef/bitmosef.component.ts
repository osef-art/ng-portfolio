import { Component } from '@angular/core';

@Component({
  selector: 'bitmosef',
  templateUrl: './bitmosef.component.html',
  styleUrls: ['./bitmosef.component.scss']
})
export class BitmosefComponent {
  hidden : boolean = false;

  constructor() { }

  hideBitmoji() {
    this.hidden = true;
  }
}
