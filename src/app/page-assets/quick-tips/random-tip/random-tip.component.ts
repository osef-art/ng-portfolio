import { Component } from '@angular/core';

@Component({
  selector: 'random-tip',
  templateUrl: './random-tip.component.html',
})
export class RandomTipComponent {
  tipSerial : number = Math.floor(Math.random() * 2) + 1;
}
