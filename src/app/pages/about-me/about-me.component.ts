import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle("hi! 👉🏾👈🏾");
  }

  ngOnInit(): void {
    HomePageComponent.buildWave(60, 60);
  }
}
