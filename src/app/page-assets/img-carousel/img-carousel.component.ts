import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Kind } from 'src/models/models';

@Component({
  selector: 'img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss']
})
export class ImgCarouselComponent implements OnInit {
  @Input() kind !: Kind;
  @Input() name !: string;
  @Input() slides !: string[];

  @Input() path !: string;
  @Input() files !: string;

  @Input() transitionTime : number = .6; // seconds
  @Input() interval : number = 0; // seconds
  @Input() height : number = 1000; // px

  indexes : number[] = [];
  selected : number = 0;
  looper : number = 0;

  ngOnInit() {
    if (!this.kind) this.kind = AppComponent.pageKind;
    if (!this.slides) {
      this.slides = this.files.split(new RegExp(", ?")).map((file) => this.path + file);
    }
    this.indexes = this.slides.map((_x,i) => i);
    this.startSliding();
  }

  get nbImg() {
    return this.slides.length;
  }

  moduled(n : number) {
    return (this.nbImg + (n % this.nbImg)) % this.nbImg;
  }

  startSliding() {
    if (this.interval > 0) {
      this.looper = window.setInterval(() => {
        this.selected = (this.selected + 1) % this.nbImg
      }, this.interval * 1000);
    }
  }

  stopSliding() {
    clearInterval(this.looper);
  }
}
