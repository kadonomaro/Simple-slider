import SimpleSlider from "../libs/simpleSlider/simple-slider.js";

let imageSlider = document.querySelector('.images');

let slider = new SimpleSlider({
    selector: imageSlider,
    nav: true,
    navClass: 'prev next',
    dots: true,
    transition: 'ease',
    speed: 300,
    slideToShow: 3,
    slideToScroll: 3
});
slider.init();



