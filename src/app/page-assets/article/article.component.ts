import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Kind, TranslatableText } from 'src/models/models';
import ArticlesData, { Article } from 'src/models/articles';
import { CustomParserService } from 'src/app/services/custom-parser.service';
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

  articleParser !: CustomParserService;
  article !: Article;

  constructor(
    private datepipe : DatePipe,
    private parser : CustomParserService,
    private scroller : PageScrollerService
  ) {
    this.articleParser = parser;
    this.articleParser.setRules({
      '<span class="white">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/,
      '$1<br>\r': /(.*)\n/
    });
  }

  ngOnInit() {
    new ArticlesData();
    this.article = ArticlesData.get(this.articleId);
  }

  get formattedDate() {
    return this.datepipe.transform(this.article.date, 'dd/MM/yyyy');
  }

  get parsedTitle() : string {
    return this.parser.parsed(
      this.article.title.translated(),
      {'<span class="shadow">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/}
    );
  }

  get parsedContent() : string {
    return this.parser.parsed(this.article.content.translated());
  }

  scrollToTop() {
    this.scroller.scrollToTop();
  }

  get moreTxt() : string {
    return new TranslatableText(
      "more " + TranslatableText.translated(this.kind) + "...",
      "+ de " + TranslatableText.translated(this.kind) + "..."
    ).translated();
  }
}
