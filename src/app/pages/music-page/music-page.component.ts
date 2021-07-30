import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss']
})
export class MusicPageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("music.");
  }
}
