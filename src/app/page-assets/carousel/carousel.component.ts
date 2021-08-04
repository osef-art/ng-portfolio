import { Component, OnInit, Input } from '@angular/core';
import { URLsData } from 'src/models/models';

@Component({
  selector: 'img-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() name!: string;
  @Input() timeDuringSlides: number = 5;
  @Input() timeBetweenSlides: number = 1;
  paths: string[] = [];
  sliderId!: string;

  constructor() {}

  ngOnInit() {
    this.sliderId = this.name + "-slider";
    this.paths = new URLsData().data[this.name];
  }

  animateCarousel(): boolean {
    // test if the browser supports animation, and if it needs a vendor prefix to do so
    var animation = false;
    var keyframeprefix = '';
    var domPrefixes: string[] = 'Webkit Moz O Khtml'.split(' ');
    // array of possible vendor prefixes
    var pfx = '';
    var slider = document.getElementById(this.sliderId);

    if (slider == null) {
      return false;
    }
    if (slider.style.animationName !== undefined) {
      animation = true;
    }
    // browser supports keyframe animation w/o prefixes

    if (animation === false) {
      for (var i = 0; i < domPrefixes.length; i++) {
        if (slider.style.getPropertyValue(domPrefixes[i] + 'AnimationName') !== undefined) {
          pfx = domPrefixes[i];
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }

    if (animation !== false) {
      var images = slider.getElementsByTagName("img");
      var firstImg = images[0];

      // get the first image inside the "slidy" element.
      var imgWrap = firstImg.cloneNode(false); // copy it.
      slider.appendChild(imgWrap); // add the clone to the end of the images

      var imgCount = images.length; // count the number of images in the slide, including the new cloned element
      var totalTime = (this.timeDuringSlides + this.timeBetweenSlides) * (imgCount - 1); // calculate the total length of the animation by multiplying the number of _actual_ images by the amount of time for both static display of each image and motion between them
      var slideRatio = (this.timeDuringSlides / totalTime) * 100; // determine the percentage of time an induvidual image is held static during the animation
      var moveRatio = (this.timeBetweenSlides / totalTime) * 100; // determine the percentage of time for an individual movement
      var basePercentage = 100 / imgCount; // work out how wide each image should be in the slidy; as a percentage.
      var position = 0; // set the initial position of the slidy element

      var css = document.createElement("style"); // start marking a new style sheet
      css.type = "text/css";
      css.innerHTML += "#" + this.sliderId + " { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%;  }\n"; // set the width for the " + this.sliderId + " container
      css.innerHTML += "#" + this.sliderId + " img { float: left; width: " + basePercentage + "%; }\n";
      css.innerHTML += "@" + keyframeprefix + "keyframes " + this.sliderId + " {\n";

      for (i = 0; i < (imgCount - 1); i++) {
        position += slideRatio; // make the keyframe the position of the image
        css.innerHTML += position + "% { left: -" + (i * 100) + "%; }\n";
        position += moveRatio; // make the postion for the _next_ slide
        css.innerHTML += position + "% { left: -" + ((i + 1) * 100) + "%; }\n";
      }
      css.innerHTML += "}\n";
      css.innerHTML += "#" + this.sliderId + " { left: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s " + this.sliderId + " infinite; }\n"; // call on the completed keyframe animation sequence
      document.body.appendChild(css); // add the new stylesheet to the end of the document
    }
    return true;
  }
}
