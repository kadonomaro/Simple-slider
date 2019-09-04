export default class SimpleSlider {
    constructor(options) {
        this.selector = options.selector;
        this.slideToShow = options.slideToShow || 3;
        this.startFrom = options.startFrom || 'first'; // first, center, last
        this.nav = options.nav || true;
        this.dots = options.dots || false;
        this.dotsClass = options.dotsClass || '';
        this.transition = options.transition || 'linear';
    }
    
    init() {
        console.dir(this);
        let sliderTrack = document.createElement('div');
        let sliderLength = this.selector.children.length;
        this.selector.classList.add('simple-slider');
        sliderTrack.classList.add('simple-slider__track');

        [...this.selector.children].forEach(child => {
            
            
            sliderTrack.appendChild(child);
            child.style.width = 100 / sliderLength + '%';
            
            
        });
        this.selector.appendChild(sliderTrack);

        sliderTrack.style.width = sliderTrack.children.length * 100 / this.slideToShow + '%';

        this.setInitialClasses(sliderTrack, 'simple-slider__slide');
    }

    

    setInitialClasses(parentSelector, className) {
        [...parentSelector.children].forEach(child => {
            child.classList.add(className);
        });
    }
    setInitialState() {}
    slidePrev() {}
    slideNext() {}
}

//Подумать над длиной трека