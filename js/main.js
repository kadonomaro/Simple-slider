import SimpleSlider from "../libs/simpleSlider/simple-slider.js";

let imageSlider = document.querySelector('.images');

let slider = new SimpleSlider({
    selector: imageSlider,
    nav: true,
    navClass: 'prev next',
    dots: true,
    dotsClass: 'dot',
    transition: 'ease',
    speed: 300,
    slideToShow: 3,
    slideToScroll: 1
});
slider.init();



