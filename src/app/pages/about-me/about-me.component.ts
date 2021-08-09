import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageScrollerService } from 'src/app/services/page-scroller.service';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  constructor(private titleService: Title, private scroller : PageScrollerService) {
    this.titleService.setTitle("hi! 👉🏾👈🏾");
    scroller.scrollToTop();
  }

  ngOnInit() {
    HomePageComponent.buildWave(60, 60);
  }
}
