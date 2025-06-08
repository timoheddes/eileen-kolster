import { gsap } from 'gsap';

class LinkFx {
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

  constructor(el: HTMLElement) {
    this.DOM = { el: el };
    this.options = {
      animation: {
        text: false,
        line: true,
      },
    };
    this.DOM.text = document.createElement('span');
    this.DOM.text.setAttribute('class', 'fractal-link-inner');
    this.DOM.text.innerHTML = this.DOM?.el?.innerHTML ?? '';
    if (this.DOM.el) {
      this.DOM.el.innerHTML = '';
      this.DOM.el.appendChild(this.DOM.text);
      this.DOM.line = document.createElement(
        'span'
      ) as HTMLSpanElement;
      this.DOM.line.setAttribute('class', 'fractal-link-deco');
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

class LinkFx1 extends LinkFx {
  constructor(el: HTMLElement) {
    super(el);
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
        // @ts-expect-error - TODO: fix this
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

class LinkFx2 extends LinkFx {
  constructor(el: HTMLElement) {
    super(el);
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
        // @ts-expect-error - TODO: fix this
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

class LinkFx3 extends LinkFx {
  constructor(el: HTMLElement) {
    super(el);
    this.filterId = '#filter-3';
    this.DOM.feDisplacementMap = document.querySelector(
      `${this.filterId} > feDisplacementMap`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback(
      'onUpdate',
      // @ts-expect-error - TODO: fix this
      () =>
        this.DOM.feDisplacementMap &&
        // @ts-expect-error - TODO: fix this
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

class LinkFx4 extends LinkFx {
  constructor(el: HTMLElement) {
    super(el);
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
        // @ts-expect-error - TODO: fix this
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

class LinkFx6 extends LinkFx {
  constructor(el: HTMLElement) {
    super(el);
    this.filterId = '#filter-6';
    this.DOM.feDisplacementMap = document.querySelector(
      `${this.filterId} > feDisplacementMap`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback('onUpdate', () => {
      if (this.DOM.feDisplacementMap) {
        // @ts-expect-error - TODO: fix this
        this.DOM.feDisplacementMap.scale.baseVal =
          this.primitiveValues.scale;
      }
    });
    this.tl.to(this.primitiveValues, {
      duration: 1,
      ease: 'Expo.easeOut',
      startAt: { scale: 80 },
      scale: 0,
    });
  }
}

class LinkFx7 extends LinkFx {
  constructor(el: HTMLElement) {
    super(el);
    this.filterId = '#filter-7';
    this.DOM.feTurbulence = document.querySelector(
      `${this.filterId} > feTurbulence`
    );
    this.primitiveValues = { turbulence: 0, scale: 0 };

    this.createTimeline();
    this.tl.eventCallback(
      'onUpdate',
      () =>
        this.DOM.feTurbulence &&
        // @ts-expect-error - TODO: fix this
        this.DOM.feTurbulence.setAttribute(
          'baseFrequency',
          this.primitiveValues.turbulence.toString()
        )
    );
    this.tl.to(this.primitiveValues, {
      duration: 0.4,
      ease: 'Expo.easeOut',
      startAt: { turbulence: 0 },
      turbulence: 1,
    });
  }
}

export default [LinkFx1, LinkFx2, LinkFx3, LinkFx4, LinkFx6, LinkFx7];
