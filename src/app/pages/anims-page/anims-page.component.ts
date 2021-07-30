import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'anims-page',
  templateUrl: './anims-page.component.html',
  styleUrls: ['./anims-page.component.scss']
})
export class AnimsPageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("anims.");
  }
}
