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
        this.autoPlay = options.autoPlay || false; //done w bugs
        this.autoPlaySpeed = options.autoPlaySpeed || 3000; //done
        this.padding = options.padding || 0; //done
        this.center = options.center || false;
        
        this._slidesCount = this.selector.children.length; //done
        this._currentSlide = 0; //done
        this._limit = this.slideToShow - this.slideToScroll; //done
        this._slideWidth = 100 / this.slideToShow;
    }
    
    get slidesCount() {
        return this._slidesCount;
    }

    get currentSlide() {
        return this._currentSlide;
    }

    get limit() {
        return this._limit;
    }

    get slideWidth() {
        return this._slideWidth;
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
            child.style.flex = `0 0 ${100 / this.slideToShow}%`;
            child.style.maxWidth = 100 / this.slideToShow + '%';
            if (this.padding) {
                child.style.padding = this.padding.split(' ').map(prop => `${prop}px`).join(' ');                
            }
        });

        this.selector.appendChild(sliderWrapper);
        sliderWrapper.appendChild(sliderTrack);

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
        const navContainer = document.createElement('div');
        const navPrevButton = document.createElement('button');
        const navNextButton = document.createElement('button');

        navContainer.classList.add('simple-slider__nav');
        navPrevButton.classList.add('simple-slider__prev');
        navNextButton.classList.add('simple-slider__next');
        navContainer.appendChild(navPrevButton);
        navContainer.appendChild(navNextButton);
        this.selector.appendChild(navContainer);

        this.slidePrev(navPrevButton, track, ()=> {
            const dots = document.querySelectorAll('.simple-slider__dot');
            dots.forEach(dot => {
                dot.classList.remove('simple-slider__dot--active');
            });
            dots[this.currentSlide].classList.add('simple-slider__dot--active');
        });

        this.slideNext(navNextButton, track,  ()=> {
            const dots = document.querySelectorAll('.simple-slider__dot');
            dots.forEach(dot => {
                dot.classList.remove('simple-slider__dot--active');
            });
            dots[this.currentSlide].classList.add('simple-slider__dot--active');
        });

        if (this.navClass) {
            const navButtonClasses = this.navClass.split(' ');
            try {
                navPrevButton.classList.add(navButtonClasses[0]);
                navNextButton.classList.add(navButtonClasses[1]);
            } catch (error) {
                console.error(error);
                console.error('You must use only one space between class: ', this.navClass);
            }
        }

    }

    
    slidePrev(button, track, callback) {
        button.addEventListener('click', (evt)=> {
            evt.preventDefault();
            if (this._currentSlide > 0) {
                this._currentSlide--;
                this.gotoSlide(this.currentSlide, track);
                callback();
            }
        });
    }


    slideNext(button, track, callback) {
        button.addEventListener('click', (evt)=> {
            evt.preventDefault();
            if (this._currentSlide < Math.floor((this._slidesCount - 1) / this.slideToScroll) - this._limit) {
                this._currentSlide++;
                this.gotoSlide(this.currentSlide, track);
                callback();
            }
        });
    }


    dotsInit(track) {
        const dotsContainer = document.createElement('div');
        const dots = document.createElement('ul');

        dotsContainer.classList.add('simple-slider__dots');
        dots.classList.add('simple-slider__dots-list');

        dotsContainer.appendChild(dots);
        
        for (let i = 0; i < this.slidesCount / this.slideToScroll - this._limit; i++) {
            const dot = document.createElement('li');
            dot.classList.add('simple-slider__dot', this.dotsClass);

            if (i === 0) {
                dot.classList.add('simple-slider__dot--active');
            }
            dots.appendChild(dot);

            dot.addEventListener('click', ()=> {
                this.gotoSlide(i, track);
                this._currentSlide = i;

                dot.parentNode.childNodes.forEach(child => {
                    child.classList.remove('simple-slider__dot--active');
                });
                dot.classList.add('simple-slider__dot--active');
            });
        }

        this.selector.appendChild(dotsContainer);
    }


    autoPlaySlides(speed, track, limit) {
        let index = 1;
        let interval = setInterval(() => {
            this.gotoSlide(index, track);
            index++;
            this._currentSlide = index;
            
            if (index >= limit - this._limit) {
                clearInterval(interval);
            }
        }, speed);
    }
    

    gotoSlide(index, track) {
        track.style.transform = `translateX(-${this._slideWidth * index * this.slideToScroll}%)`;
    }

    cloneSlide(slides, startFrom, parent) {
        const newSlide = slides[startFrom].cloneNode(true);
        parent.removeChild(slides[startFrom]);
        parent.appendChild(newSlide);
    }

    
}
