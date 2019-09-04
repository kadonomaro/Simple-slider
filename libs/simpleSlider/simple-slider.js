class SimpleSlider {
    constructor(options) {
        this.selector = options.selector;
        this.slideToShow = options.slideToShow || 3;
        this.nav = options.nav || true;
    }
    init() {
        this.addClass();
    }
    addClass() {
        [...this.selector.children].forEach(child => {
            child.classList.add('simple-slider__slide');
        });
    }
    slidePrev() {
        
    }
    slideNext() {
        
    }
}

export default SimpleSlider;