export default class SimpleSlider {
    
    constructor(options) {
        this.selector = options.selector; //done
        this.slideToShow = options.slideToShow || 3; //done
        this.slideToScroll = options.slideToScroll || 1; //done w bugs
        this.startFrom = options.startFrom || 'first'; // first, center, last
        this.nav = options.nav || false; //done
        this.navClass = options.navClass || ''; //done
        this.dots = options.dots || false;
        this.dotsClass = options.dotsClass || '';
        this.transition = options.transition || 'linear'; //done
        this.speed = options.speed || 300; //done
        this.slidesCount = this.selector.children.length; //done
        this.slideCounter = 0; //done
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

        if (this.nav) {
            this.navInit(sliderTrack);
        }

        if (this.dots) {
            this.dotsInit();
        }
        
    }

    setInitialClasses(parentSelector, className) {
        [...parentSelector.children].forEach(child => {
            child.classList.add(className);
        });
    }

    navInit(track) {
        const navContainer = document.createElement('div');
        const navPrevButton = document.createElement('button');
        const navNextButton = document.createElement('button');
        const that = this;

        navContainer.classList.add('simple-slider__nav');
        navPrevButton.classList.add('simple-slider__prev');
        navPrevButton.textContent = '<';
        navNextButton.classList.add('simple-slider__next');
        navNextButton.textContent = '>';
        navContainer.appendChild(navPrevButton);
        navContainer.appendChild(navNextButton);
        this.selector.appendChild(navContainer);

        this.slidePrev(navPrevButton, track, function () {
            const dots = document.querySelectorAll('.simple-slider__dot');
            dots.forEach(dot => {
                dot.classList.remove('simple-slider__dot--active');
            });
            dots[that.slideCounter].classList.add('simple-slider__dot--active');

        });

        this.slideNext(navNextButton, track, function () {
            const dots = document.querySelectorAll('.simple-slider__dot');
            dots.forEach(dot => {
                dot.classList.remove('simple-slider__dot--active');
            });
            dots[that.slideCounter].classList.add('simple-slider__dot--active');
        });

        if (this.navClass) {
            navPrevButton.classList.add(this.navClass.split(' ')[0]);
            navNextButton.classList.add(this.navClass.split(' ')[1]);
        }
    }

    
    slidePrev(button, track, callback) {
        const that = this;
        button.addEventListener('click', function (evt) {
            if (that.slideCounter > 0) {
                evt.preventDefault();
                that.slideCounter--;
                track.style.transform = `translateX(-${100 / track.children.length * that.slideCounter * that.slideToScroll}%)`;
                callback();
            }
        });
    }

    slideNext(button, track, callback) {
        const that = this;
        button.addEventListener('click', function (evt) {
            if (that.slideCounter < Math.floor((that.slidesCount - 1) / that.slideToScroll)) {
                evt.preventDefault();
                that.slideCounter++;
                track.style.transform = `translateX(-${100 / track.children.length * that.slideCounter * that.slideToScroll}%)`;
                callback();
            }
        });
    }

    dotsInit() {
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('simple-slider__dots');
        const dots = document.createElement('ul');
        dots.classList.add('simple-slider__dots-list');
        dotsContainer.appendChild(dots);
        
        for (let i = 0; i < this.slidesCount / this.slideToScroll; i++) {
            const dot = document.createElement('li');
            dot.classList.add('simple-slider__dot', this.dotsClass);
            if (i === 0) {
                dot.classList.add('simple-slider__dot--active');
            }
            dots.appendChild(dot);
        }
        this.selector.appendChild(dotsContainer);

        
    }


}
