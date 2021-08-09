import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DatePipe } from '@angular/common';
import { Kind } from 'src/models/models';
import ArticlesData, { Article } from 'src/models/articles';
import { MdToHtmlParserService } from 'src/app/services/md-to-html-parser.service';
import { PageScrollerService } from 'src/app/services/page-scroller.service';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() articleId !: string;
  @Input() kind: Kind = Kind.NONE;

  @Input() btnText !: string;
  @Input() link !: string;
  @Input() githubLink ?: string;

  @Input() textRight : boolean = false;
  @Input() new : boolean = false;

  articleParser !: MdToHtmlParserService;
  article !: Article;

  constructor(
    private datepipe : DatePipe,
    private parser : MdToHtmlParserService,
    private scroller : PageScrollerService
  ) {
    parser.addRules({
      '<span class="white">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/,
      '$1<br>\r': /(.*)\n/
    });
    this.articleParser = parser;
  }

  ngOnInit() {
    new ArticlesData();
    this.article = ArticlesData.get(this.articleId);
  }

  get formattedDate() {
    return this.datepipe.transform(this.article.date, 'dd/MM/yyyy');
  }

  get parsedTitle() : string {
    return this.parser.parsedWithRules(
      this.article.title.in(AppComponent.language),
      {'<span class="shadow">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/}
    );
  }

  get parsedContent() : string {
    return this.parser.parsed(this.article.content.in(AppComponent.language));
  }

  scrollToTop() {
    this.scroller.scrollToTop();
  }
}
