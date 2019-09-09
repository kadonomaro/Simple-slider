export default class SimpleSlider {
    
    constructor(options) {
        this.selector = options.selector; //done
        this.slideToShow = options.slideToShow || 3; //done
        this.slideToScroll = options.slideToScroll || 1; //done w bugs
        this.nav = options.nav || false; //done
        this.navClass = options.navClass || ''; //done
        this.dots = options.dots || false; //done
        this.dotsClass = options.dotsClass || ''; //done
        this.transition = options.transition || 'linear'; //done
        this.speed = options.speed || 300; //done
        this.slidesCount = this.selector.children.length; //done
        this.slideCounter = 0; //done
        this.autoPlay = options.autoPlay || false; //done
        this.autoPlaySpeed = options.autoPlaySpeed || 3000; //done
        this.padding = options.padding + 'px' || 0; //done
        this.limit = this.slideToShow - this.slideToScroll;
    }
    
    
    init() {
        let sliderTrack = document.createElement('div');
        let sliderWrapper = document.createElement('div');

        this.selector.classList.add('simple-slider');
        sliderTrack.classList.add('simple-slider__track');
        sliderWrapper.classList.add('simple-slider__wrapper');
        sliderTrack.style.transition = `transform ${this.speed}ms ${this.transition}`;

        [...this.selector.children].forEach((child, index) => {
            sliderTrack.appendChild(child);
            child.dataset.index = index;
            child.style.width = 100 / this.slidesCount + '%';
            child.style.maxWidth = 100 / this.slideToShow + '%';
            if (this.padding) {
                child.style.padding = `0 ${this.padding}`;
            }
        });

        this.selector.appendChild(sliderWrapper);
        sliderWrapper.appendChild(sliderTrack);

        sliderTrack.style.width = this.slidesCount * 100 / this.slideToShow + '%';

        this.setInitialClasses(sliderTrack, 'simple-slider__slide');

        if (this.nav) {
            this.navInit(sliderTrack);
        }

        if (this.dots) {
            this.dotsInit(sliderTrack);
        }

        if (this.autoPlay) {
            this.autoPlaySlides(this.autoPlaySpeed, sliderTrack, this.slidesCount);
        }
        
    }


    setInitialClasses(parentSelector, className) {
        [...parentSelector.children].forEach(child => {
            child.classList.add(className);
        });
    }


    navInit(track) {
        const that = this;
        const navContainer = document.createElement('div');
        const navPrevButton = document.createElement('button');
        const navNextButton = document.createElement('button');

        navContainer.classList.add('simple-slider__nav');
        navPrevButton.classList.add('simple-slider__prev');
        navNextButton.classList.add('simple-slider__next');
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
            evt.preventDefault();
            if (that.slideCounter > 0) {
                that.slideCounter--;
                that.gotoSlide(that.slideCounter, track);
                callback();
            }
        });
    }


    slideNext(button, track, callback) {
        const that = this;
        button.addEventListener('click', function (evt) {
            evt.preventDefault();
            // that.cloneSlide(track.children, 0, track);
            if (that.slideCounter < Math.floor((that.slidesCount - 1) / that.slideToScroll) - that.limit) {
                that.slideCounter++;
                that.gotoSlide(that.slideCounter, track);
                callback();
            }
        });
    }


    dotsInit(track) {
        const that = this;
        const dotsContainer = document.createElement('div');
        const dots = document.createElement('ul');
        dotsContainer.classList.add('simple-slider__dots');
        dots.classList.add('simple-slider__dots-list');
        dotsContainer.appendChild(dots);
        
        for (let i = 0; i < this.slidesCount / this.slideToScroll - this.limit; i++) {
            const dot = document.createElement('li');
            dot.classList.add('simple-slider__dot', this.dotsClass);

            if (i === 0) {
                dot.classList.add('simple-slider__dot--active');
            }
            dots.appendChild(dot);

            dot.addEventListener('click', function () {
                that.gotoSlide(i, track);
                that.slideCounter = i;
                this.parentNode.childNodes.forEach(child => {
                    child.classList.remove('simple-slider__dot--active');
                });
                this.classList.add('simple-slider__dot--active');
            });
        }

        this.selector.appendChild(dotsContainer);
    }


    autoPlaySlides(speed, track, limit) {
        let index = 1;
        let interval = setInterval(() => {
            this.gotoSlide(index, track);
            index++;
            this.slideCounter = index;
            if (index >= limit - this.limit) {
                clearInterval(interval);
            }
        }, speed);
    }
    

    gotoSlide(index, track) {
        const that = this;
        track.style.transform = `translateX(-${100 / that.slidesCount * index * that.slideToScroll}%)`;
    }

    cloneSlide(slides, startFrom, parent) {
        const newSlide = slides[startFrom].cloneNode(true);
        parent.removeChild(slides[startFrom]);
        parent.appendChild(newSlide);
    }

    
}
