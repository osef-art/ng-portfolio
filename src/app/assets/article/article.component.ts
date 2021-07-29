import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import ArticlesData, { Article, Kind, Lang, URLsData } from 'src/models/models';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  eKind = Kind;
  @Input() articleId !: string;
  @Input() kind: Kind = Kind.NONE;
  @Input() githubLink ?: string;
  @Input() textRight : boolean = false;
  @Input() new : boolean = false;
  article !: Article;

  constructor(private datepipe : DatePipe) {
  }

  ngOnInit(): void {
    new ArticlesData();
    this.article = ArticlesData.get(this.articleId);
  }

  get formattedDate() {
    return this.datepipe.transform(this.article.date, 'dd/MM/yyyy');
  }

  get parsedTitle() : string {
    var parsedTxt: string = this.article.title;
    var regex = /\*([^\s]([^\*]+)[^\s])\*/;

    while (regex.test(parsedTxt)) {
      parsedTxt = parsedTxt.replace(regex, '<span class="shadow">$1</span>' + "\r");
    }
    return parsedTxt;
  }

  get parsedContent() : string {
    var parsedTxt: string = this.article.content;
    var regex = /\*([^\s]([^\*]+)[^\s])\*/;
    var regexLine = /(.*)\n/;

    while (regex.test(parsedTxt)) {
      parsedTxt = parsedTxt.replace(regex, '<span class="white">$1</span>\r');
    }
    while (regexLine.test(parsedTxt)) {
      parsedTxt = parsedTxt.replace(regexLine, '$1<br>\r');
    }
    return parsedTxt;
  }
}
