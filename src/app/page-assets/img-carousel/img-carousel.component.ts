import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss']
})
export class ImgCarouselComponent implements OnInit {
  @Input() name !: string;
  @Input() slides !: string[];

  @Input() path !: string;
  @Input() files !: string;
  @Input() interval : number = 0;
  @Input() height : number = 1000;

  indexes : number[] = [];
  selected : number = 0;
  looper : number = 0;

  ngOnInit() {
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
      }, this.interval);
    }
  }

  stopSliding() {
    clearInterval(this.looper);
  }
}
