import { Component, OnInit } from '@angular/core';

declare const document: any;

@Component({
  selector: 'app-media-slider',
  templateUrl: './media-slider.component.html',
  styleUrls: ['./media-slider.component.css']
})
export class MediaSliderComponent implements OnInit {

  // manual slider
  // slideIndex: any = 1;

  // auto slider
  slideIndex: any = 0;

  constructor() { }

    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    }

    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
      let slideindex = this.slideIndex
      let i;
      const slides = document.getElementsByClassName('mySlides');
      const dots = document.getElementsByClassName('dot');
      if (n > slides.length) {slideindex = 1}
      if (n < 1) {slideindex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(' active', '');
      }
      slides[slideindex - 1].style.display = 'block';
      dots[slideindex - 1].className += ' active';
    }


    // auto slider



    showSlidesAuto() {
      let slideindex = 0;
      let ii;
      const slides = document.getElementsByClassName('mySlides');
      for (ii = 0; ii < slides.length; ii++) {
          slides[ii].style.display = 'none';
      }
      slideindex++;
      if (slideindex > slides.length) {slideindex = 1}
      slides[slideindex - 1].style.display = 'block';
      setTimeout(this.showSlides, 2000); // Change image every 2 seconds
    }

  ngOnInit() {

    this.showSlides(this.slideIndex);


    // auto
    this.showSlidesAuto();

  }

}
