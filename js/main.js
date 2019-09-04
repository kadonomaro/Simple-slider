import SimpleSlider from "../libs/simpleSlider/simple-slider.js";

let imageSlider = document.querySelector('.images');

let slider = new SimpleSlider({
    selector: imageSlider,
    nav: true,
    transition: 'ease',
    slideToShow: 3,
});
slider.init();
