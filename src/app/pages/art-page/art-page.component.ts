import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-art-page',
  templateUrl: './art-page.component.html',
  styleUrls: ['./art-page.component.scss']
})
export class ArtPageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("art.");
  }
}
