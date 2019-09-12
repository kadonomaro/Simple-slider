import SimpleSlider from "../libs/simpleSlider/simple-slider.js";

let imageSlider = document.querySelector('.images');

let slider = new SimpleSlider({
    selector: imageSlider,
    nav: true,
    navClass: 'prev next',
    dots: true,
    dotsClass: 'dot',
    transition: 'ease',
    speed: 500,
    slideToShow: 3,
    slideToScroll: 1,
    autoPlay: false,
    autoPlaySpeed: 600,
    padding: 30,
    center: true
});
slider.init();





