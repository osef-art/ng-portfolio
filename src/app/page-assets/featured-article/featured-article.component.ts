import { Component, Input } from '@angular/core';
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
}
