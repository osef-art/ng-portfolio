import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageScrollerService {
  scrollToY(yDest : number) {
    let scrollAnim : number = window.setInterval(() => {
      let pageY : number = window.pageYOffset;
      if (pageY > yDest) {
        window.scrollTo(0, pageY * 3 / 4);
      } else {
        window.clearInterval(scrollAnim);
      }
    }, 8);
  }

  scrollToTop() {
    this.scrollToY(0);
  }

  scrollToBottom(yOffset : number) {
    this.scrollToY(yOffset);
  }

  scrollTo(elm: HTMLElement) {
    elm.scrollIntoView();

    let yDest = window.pageYOffset;
    this.scrollToY(yDest);
  }
}
