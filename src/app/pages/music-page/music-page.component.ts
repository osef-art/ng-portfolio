import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { Kind } from 'src/models/models';

@Component({
  selector: 'music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss']
})
export class MusicPageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("music.");
    AppComponent.setPageKind(Kind.MUSIC);
  }
}
