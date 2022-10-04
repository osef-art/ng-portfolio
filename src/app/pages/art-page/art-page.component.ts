import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { WebClientService } from 'src/app/services/web-client.service';
import { Kind } from 'src/models/models';

@Component({
  selector: 'app-art-page',
  templateUrl: './art-page.component.html',
  styleUrls: ['./art-page.component.scss']
})
export class ArtPageComponent {
  data !: string ;

  constructor(private titleService: Title, private webClient: WebClientService) {
    this.titleService.setTitle("art.");
    AppComponent.setPageKind(Kind.ART);
    webClient.getNotionDatabase(Kind.ART);
  }
}
