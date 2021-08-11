import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomParserService } from 'src/app/services/custom-parser.service';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.scss']
})
export class FeaturedArticleComponent extends ArticleComponent {
  @Input() guestName !: string;
  @Input() websiteLink !: string;
  @Input() twitterLink !: string;

  constructor(datepipe : DatePipe, parser : CustomParserService, scroller : PageScrollerService) {
    super(datepipe, parser, scroller);
  }

  ngOnInit() {
    super.ngOnInit();
    this.guestName = '@' + this.guestName;

    this.articleParser.setRules({
      [this.guestName] : /\[guest\]/,
      '<span class="white">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/,
      '<a target="_blank" href="$2">$1</a>': /\[(.+)\]\((.+)\)/,
      '$1<br>\r': /(.*)\n/,
    });
  }
}
