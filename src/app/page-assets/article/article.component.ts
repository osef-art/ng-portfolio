import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import ArticlesData, { Article, Kind } from 'src/models/models';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleId !: string;
  @Input() kind: Kind = Kind.NONE;

  @Input() btnText !: string;
  @Input() githubLink ?: string;
  @Input() textRight : boolean = false;
  @Input() new : boolean = false;
  article !: Article;
  regexPatterns : { [key:string]: RegExp } = {
    '<span class="white">$1</span>': /\*([^\s]([^\*]+)[^\s])\*/,
    '$1<br>\r': /(.*)\n/
  }

  constructor(private datepipe : DatePipe) {}

  ngOnInit(): void {
    new ArticlesData();
    this.article = ArticlesData.get(this.articleId);
  }

  get formattedDate() {
    return this.datepipe.transform(this.article.date, 'dd/MM/yyyy');
  }

  get parsedTitle() : string {
    var parsedTxt: string = this.article.title.in(AppComponent.language);
    var regex = /\*([^\s]([^\*]+)[^\s])\*/;

    while (regex.test(parsedTxt)) {
      parsedTxt = parsedTxt.replace(regex, '<span class="shadow">$1</span>');
    }
    return parsedTxt;
  }

  get parsedContent() : string {
    var parsedTxt: string = this.article.content.in(AppComponent.language);

    Object.keys(this.regexPatterns).forEach(reg => {
      var regex = this.regexPatterns[reg];

      while (regex.test(parsedTxt)) {
        parsedTxt = parsedTxt.replace(regex, reg);
      }
    });
    return parsedTxt;
  }
}
