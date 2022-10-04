import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebClientService } from 'src/app/services/web-client.service';
import { CustomParserService } from 'src/app/services/custom-parser.service';
import { AppComponent } from 'src/app/app.component';
import { Kind } from 'src/models/models';
import * as marked from 'marked';
import { PageScrollerService } from 'src/app/services/page-scroller.service';

@Component({
  selector: 'game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId !: string;
  readmeHTML !: string;

  constructor(
    private webClient : WebClientService,
    private scroller : PageScrollerService,
    private parser : CustomParserService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    const name = this.route.snapshot.paramMap.get('id');
    if (name) this.gameId = name;

    this.scroller.scrollToTop();
    AppComponent.setPageKind(Kind.GAMES);
    this.getGameReadmeFile();
  }

  get Kind() : typeof Kind {
    return Kind;
  }

  getGameReadmeFile() {
    const githubURL : string = "(https://raw.githubusercontent.com/osef-art/" + this.gameId + "/main/$1";

    this.webClient
      .getGithubReadMeFrom(this.gameId)
      .subscribe(data => {
        // edit urls correctly
        this.readmeHTML = this.parser.parsed(data, {
          [githubURL] : /\(([a-zA-Z0-9_\-/]+\.(png|jpg|gif))/
        });

        // MD to HTML
        this.readmeHTML = marked.setOptions({}).parse(this.readmeHTML);

        // POST-HTML rules
        this.readmeHTML = this.parser.parsed(this.readmeHTML, {
          '<p class="warning">$1</p>' : /<p>(\s*⚠.*\n.*)<\/p>/,
          '</h1>\n<p class="intro">$1</p>' : /<\/h1>\n<p>(.*\n?.*)<\/p>/
        });
      });
  }

  scrollToLinks() {
    this.scroller.scrollToBottom(screen.height - 5000);
  }
}
