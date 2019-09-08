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
        this.slidesCount = this.selector.children.length;
        this.slideCounter = 0;
    }
    
    
    init() {
        let sliderTrack = document.createElement('div');
        let sliderWrapper = document.createElement('div');

        this.selector.classList.add('simple-slider');
        sliderTrack.classList.add('simple-slider__track');
        sliderWrapper.classList.add('simple-slider__wrapper');
        sliderTrack.style.transition = `transform ${this.speed}ms ${this.transition}`;

        [...this.selector.children].forEach(child => {
            
            sliderTrack.appendChild(child);
            child.style.width = 100 / this.slidesCount + '%';
            
        });
        this.selector.appendChild(sliderWrapper);
        sliderWrapper.appendChild(sliderTrack);

        sliderTrack.style.width = this.slidesCount * 100 / this.slideToShow + '%';

        this.setInitialClasses(sliderTrack, 'simple-slider__slide');
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
        let slideCounter = 0;
        navContainer.classList.add('simple-slider__nav');
        navPrevButton.classList.add('simple-slider__prev');
        navPrevButton.textContent = '<';
        navNextButton.classList.add('simple-slider__next');
        navNextButton.textContent = '>';
        navContainer.appendChild(navPrevButton);
        navContainer.appendChild(navNextButton);
        parent.appendChild(navContainer);

        this.slidePrev(navPrevButton, track);
        this.slideNext(navNextButton, track);

        if (this.navClass) {
            navPrevButton.classList.add(this.navClass.split(' ')[0]);
            navNextButton.classList.add(this.navClass.split(' ')[1]);
        }
    }

    setInitialState() { }
    
    slidePrev(button, track) {
        const that = this;
        button.addEventListener('click', function (evt) {
            if (that.slideCounter > 0) {
                evt.preventDefault();
                that.slideCounter--;
                track.style.transform = `translateX(-${100 / track.children.length * that.slideCounter}%)`;
                console.log(that.slideCounter);
            }

        });
    }

    slideNext(button, track) {
        const that = this;
        button.addEventListener('click', function (evt) {
            if (that.slideCounter < that.slidesCount - 1) {
                evt.preventDefault();
                that.slideCounter++;
                track.style.transform = `translateX(-${100 / track.children.length * that.slideCounter}%)`;
                console.log(that.slideCounter);
            }

        });
    }
}

//Подумать над длиной трека