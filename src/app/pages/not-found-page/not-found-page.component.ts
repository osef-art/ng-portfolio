import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageScrollerService } from 'src/app/services/page-scroller.service';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
  constructor(private titleService: Title, private scroller : PageScrollerService) {
    this.titleService.setTitle("nope. not here");
    scroller.scrollToTop();
  }
}
