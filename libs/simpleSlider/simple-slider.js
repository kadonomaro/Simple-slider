export default class SimpleSlider {
    constructor(options) {
        this.selector = options.selector;
        this.slideToShow = options.slideToShow || 3;
        this.slideToScroll = options.slideToScroll || 1;
        this.startFrom = options.startFrom || 'first'; // first, center, last
        this.nav = options.nav || true;
        this.navClass = options.navClass || '';
        this.dots = options.dots || false;
        this.dotsClass = options.dotsClass || '';
        this.transition = options.transition || 'linear';
        this.speed = options.speed || 300;
    }
    
    init() {

        let sliderTrack = document.createElement('div');
        let sliderWrapper = document.createElement('div');
        let sliderLength = this.selector.children.length;
        this.selector.classList.add('simple-slider');
        sliderTrack.classList.add('simple-slider__track');
        sliderWrapper.classList.add('simple-slider__wrapper');
        sliderTrack.style.transition = `transform ${this.speed}ms ${this.transition}`;

        [...this.selector.children].forEach(child => {
            
            sliderTrack.appendChild(child);
            child.style.width = 100 / sliderLength + '%';
            
        });
        this.selector.appendChild(sliderWrapper);
        sliderWrapper.appendChild(sliderTrack);
        // this.selector.appendChild(sliderTrack);

        sliderTrack.style.width = sliderTrack.children.length * 100 / this.slideToShow + '%';

        this.setInitialClasses(sliderTrack, 'simple-slider__slide');


        sliderTrack.addEventListener('click', function () {
            this.style.transform += 'translateX(-10%)'; 
        });

        this.navInit(sliderWrapper, sliderTrack);
    }

    

    setInitialClasses(parentSelector, className) {
        [...parentSelector.children].forEach(child => {
            child.classList.add(className);
        });
    }

    navInit(parent, track) {
        const navContainer = document.createElement('div');
        const navPrevButton = document.createElement('button');
        const navNextButton = document.createElement('button');
        navContainer.classList.add('simple-slider__nav');
        navPrevButton.classList.add('simple-slider__prev');
        navNextButton.classList.add('simple-slider__next');
        navContainer.appendChild(navPrevButton);
        navContainer.appendChild(navNextButton);
        parent.appendChild(navContainer);

        this.slidePrev(navPrevButton, track);
        this.slideNext(navNextButton, track);
    }
    setInitialState() { }
    

    slidePrev(button, track) {
        button.addEventListener('click', function (evt) {
            evt.preventDefault();
            track.style.transform = `translateX(10%)`;
        });
    }
    slideNext(button, track) {
        button.addEventListener('click', function (evt) {
            evt.preventDefault();
            track.style.transform = `translateX(-10%)`;
        });
    }
}

//Подумать над длиной трека