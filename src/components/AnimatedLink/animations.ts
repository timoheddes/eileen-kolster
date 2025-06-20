import { gsap } from 'gsap';

export type AnimatedLinkEffect =
  | 'line'
  | 'twolines'
  | 'linethrough'
  | 'circle'
  | 'box'
  | 'diagonal';

class Animation {
  DOM: Partial<HTMLElement> &
    Partial<{
      el: HTMLElement;
      text: HTMLSpanElement;
      line: HTMLSpanElement;
      feTurbulence: Partial<SVGFEComponentTransferElement> | null;
      feDisplacementMap: Partial<SVGFEDisplacementMapElement> | null;
    }>;
  options: {
    animation: {
      text: boolean;
      line: boolean;
    };
  };
  onMouseEnterFn: () => void;
  onMouseLeaveFn: () => void;
  tl: GSAPTimeline;
  filterId: string;
  primitiveValues: {
    turbulence: number;
    scale: number;
  };

  constructor(
    el: HTMLElement,
    effect: AnimatedLinkEffect,
    size: number
  ) {
    this.DOM = { el: el };
    this.options = {
      animation: {
        text: false,
        line: true,
      },
    };
    this.DOM.text = document.createElement('span');
    this.DOM.text.setAttribute('class', 'animated-link-inner');
    this.DOM.text.innerHTML = this.DOM?.el?.innerHTML ?? '';
    if (this.DOM.el) {
      this.DOM.el.innerHTML = '';
      this.DOM.el.appendChild(this.DOM.text);
      this.DOM.line = document.createElement(
        'span'
      ) as HTMLSpanElement;
      this.DOM.line.setAttribute('class', 'animated-link-deco');
      if (effect === 'circle' || effect === 'box') {
        this.DOM.line.style.width = `${size}rem`;
        this.DOM.line.style.height = `${size}rem`;
        this.DOM.line.style.margin = `-${size / 2}rem 0 0 -${
          size / 2
        }rem`;
      }
      this.DOM.el.appendChild(this.DOM.line);
    }

    this.onMouseEnterFn = () => {};
    this.onMouseLeaveFn = () => {};
    this.tl = gsap.timeline({
      paused: true,
    });
    this.filterId = '';
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.initEvents();
  }
  initEvents() {
    this.onMouseEnterFn = () => this.tl.restart();
    this.onMouseLeaveFn = () => this.tl.progress(1).kill();
    this.DOM.el?.addEventListener('mouseenter', this.onMouseEnterFn);
    this.DOM.el?.addEventListener('mouseleave', this.onMouseLeaveFn);
  }
  createTimeline() {
    // init timeline
    this.tl = gsap.timeline({
      paused: true,
      onStart: () => {
        if (this.options.animation.line && this.DOM.line) {
          this.DOM.line.style.filter = `url(${this.filterId}`;
        }
        if (this.options.animation.text && this.DOM.text) {
          this.DOM.text.style.filter = `url(${this.filterId}`;
        }
      },
      onComplete: () => {
        if (this.options.animation.line && this.DOM.line) {
          this.DOM.line.style.filter = 'none';
        }
        if (this.options.animation.text && this.DOM.text) {
          this.DOM.text.style.filter = 'none';
        }
      },
    });
  }
}

class Animation1 extends Animation {
  constructor(
    el: HTMLElement,
    effect: AnimatedLinkEffect,
    size: number
  ) {
    super(el, effect, size);
    this.filterId = '#filter-1';
    this.DOM.feTurbulence = document.querySelector(
      `${this.filterId} > feTurbulence`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback(
      'onUpdate',
      () =>
        this.DOM.feTurbulence &&
        // @ts-expect-error - ...
        this.DOM.feTurbulence.setAttribute(
          'baseFrequency',
          this.primitiveValues.turbulence.toString()
        )
    );
    this.tl.to(this.primitiveValues, {
      duration: 0.4,
      //ease: "Quint.easeOut",
      startAt: { turbulence: 0.09 },
      turbulence: 0,
    });
  }
}

class Animation2 extends Animation {
  constructor(
    el: HTMLElement,
    effect: AnimatedLinkEffect,
    size: number
  ) {
    super(el, effect, size);
    this.filterId = '#filter-2';
    this.DOM.feTurbulence = document.querySelector(
      `${this.filterId} > feTurbulence`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback(
      'onUpdate',
      () =>
        this.DOM.feTurbulence &&
        // @ts-expect-error - ...
        this.DOM.feTurbulence.setAttribute(
          'baseFrequency',
          this.primitiveValues.turbulence.toString()
        )
    );
    this.tl.to(this.primitiveValues, {
      duration: 0.4,
      ease: "rough({ template: none.out, strength: 2, points: 120, taper: 'none', randomize: true, clamp: false})",
      startAt: { turbulence: 0.07 },
      turbulence: 0,
    });
  }
}

class Animation3 extends Animation {
  constructor(
    el: HTMLElement,
    effect: AnimatedLinkEffect,
    size: number
  ) {
    super(el, effect, size);
    this.filterId = '#filter-3';
    this.DOM.feDisplacementMap = document.querySelector(
      `${this.filterId} > feDisplacementMap`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback(
      'onUpdate',
      // @ts-expect-error - ...
      () =>
        this.DOM.feDisplacementMap &&
        // @ts-expect-error - ...
        (this.DOM.feDisplacementMap.scale.baseVal =
          this.primitiveValues.scale)
    );
    this.tl
      .to(this.primitiveValues, {
        duration: 0.1,
        ease: 'Expo.easeOut',
        startAt: { scale: 0 },
        scale: 60,
      })
      .to(this.primitiveValues, {
        duration: 0.6,
        ease: 'Back.easeOut',
        //startAt: {scale: 90},
        scale: 0,
      });
  }
}

class Animation4 extends Animation {
  constructor(
    el: HTMLElement,
    effect: AnimatedLinkEffect,
    size: number
  ) {
    super(el, effect, size);
    this.filterId = '#filter-4';
    this.DOM.feTurbulence = document.querySelector(
      `${this.filterId} > feTurbulence`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback(
      'onUpdate',
      () =>
        this.DOM.feTurbulence &&
        // @ts-expect-error - ...
        this.DOM.feTurbulence.setAttribute(
          'baseFrequency',
          this.primitiveValues.turbulence.toString()
        )
    );
    this.tl.to(this.primitiveValues, {
      duration: 0.6,
      ease: 'steps(12)',
      startAt: { turbulence: 0.05 },
      turbulence: 0,
    });
  }
}

class Animation5 extends Animation {
  constructor(
    el: HTMLElement,
    effect: AnimatedLinkEffect,
    size: number
  ) {
    super(el, effect, size);
    this.filterId = '#filter-5';
    this.DOM.feDisplacementMap = document.querySelector(
      `${this.filterId} > feDisplacementMap`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback(
      'onUpdate',
      // @ts-expect-error - ...
      () =>
        this.DOM.feDisplacementMap &&
        // @ts-expect-error - ...
        (this.DOM.feDisplacementMap.scale.baseVal =
          this.primitiveValues.scale)
    );
    this.tl
      /*.to(this.primitiveValues, {
            duration: 0.1,
            ease: 'Power1.easeOut',
            startAt: {scale: 0},
            scale: 40
        })
        .to(this.primitiveValues, {
            duration: 0.7,
            ease: 'Expo.easeOut',
            scale: 0
        })*/
      .to(
        this.primitiveValues,
        {
          duration: 0.7,
          startAt: { scale: 40 },
          // ease: 'Expo.easeOut',
          ease: "rough({ template: none.out, strength: 2, points: 120, taper: 'none', randomize: true, clamp: false})",
          scale: 0,
        },
        0
      )
      .to(
        // @ts-expect-error - ...
        this.DOM.line,
        {
          duration: 0.7,
          startAt: { y: -5 },
          ease: 'Expo.easeOut',
          y: 0,
        },
        0
      );
  }
}

export default [
  Animation1,
  Animation2,
  Animation3,
  Animation4,
  Animation5,
];
