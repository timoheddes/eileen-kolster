import { lerp, getMousePos, distance } from '../../utils';

declare global {
  interface Window {
    mousepos: {
      x: number;
      y: number;
    };
  }
}

type RenderStyle = {
  previous: number;
  current: number;
  amt: number;
};

const throttle = {
  low: 30,
  normal: 15,
  high: 5,
};

export default class MagneticController {
  DOM: {
    el: HTMLElement;
    text?: string | HTMLElement;
  };
  renderedStyles: {
    tx: RenderStyle;
    ty: RenderStyle;
  };
  state: {
    hover: boolean;
  };
  rect: null | DOMRect;
  distanceToTrigger: {
    x: number;
    y: number;
  };
  onResize: void | MagneticController['calculateSizePosition'];
  animation: number;
  performance: number;
  throttleRenderCycle: boolean;

  constructor(
    el: HTMLElement,
    performance: 'low' | 'normal' | 'high'
  ) {
    this.performance = throttle[performance];
    this.rect = null;
    this.distanceToTrigger = { x: 0, y: 0 };
    this.DOM = { el: el };
    this.DOM.text = this.DOM.el.querySelector('.text') as HTMLElement;
    this.onResize = () => null;
    this.throttleRenderCycle = false;

    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.1 },
      ty: { previous: 0, current: 0, amt: 0.1 },
    };

    this.state = {
      hover: false,
    };

    this.calculateSizePosition();
    this.initEvents();
    this.animation = requestAnimationFrame(() => this.render());
  }
  calculateSizePosition(): void {
    this.rect = this.DOM.el.getBoundingClientRect();
    this.distanceToTrigger = {
      x: this.rect.width * 0.3,
      y: this.rect.height * 0.3,
    };
  }
  initEvents(): void {
    if (!window.mousepos) {
      window.addEventListener(
        'mousemove',
        (ev) => (window.mousepos = getMousePos(ev))
      );
    }
    this.onResize = () => this.calculateSizePosition();
    window.addEventListener('resize', this.onResize);
  }
  render(): void | number {
    if (this.throttleRenderCycle || !window.mousepos || !this.rect) {
      cancelAnimationFrame(this.animation);
      return (this.animation = requestAnimationFrame(() =>
        this.render()
      ));
    }

    this.throttleRenderCycle = true;
    setTimeout(() => {
      this.throttleRenderCycle = false;
    }, this.performance);

    // calculate the distance from the mouse to the center of the button
    const distanceMouseButton = distance(
      window.mousepos.x + window.scrollX,
      window.mousepos.y + window.scrollY,
      this.rect.left + this.rect.width / 2,
      this.rect.top + this.rect.height / 2
    );

    let x = 0;
    let y = 0;

    const distanceToTrigger = Math.max(
      this.distanceToTrigger.x,
      this.distanceToTrigger.y
    );
    if (distanceMouseButton < distanceToTrigger) {
      if (!this.state.hover) {
        this.enter();
      }
      x =
        (window.mousepos.x +
          window.scrollX -
          (this.rect.left + this.rect.width / 2)) *
        0.3;
      y =
        (window.mousepos.y +
          window.scrollY -
          (this.rect.top + this.rect.height / 2)) *
        0.3;
    } else if (this.state.hover) {
      this.leave();
    }

    this.renderedStyles['tx'].current = x;
    this.renderedStyles['ty'].current = y;

    for (const key in this.renderedStyles) {
      this.renderedStyles[
        key as keyof typeof this.renderedStyles
      ].previous = lerp(
        this.renderedStyles[key as keyof typeof this.renderedStyles]
          .previous,
        this.renderedStyles[key as keyof typeof this.renderedStyles]
          .current,
        this.renderedStyles[key as keyof typeof this.renderedStyles]
          .amt
      );
    }

    const rotate =
      this.DOM.el.style.transform.match(/rotate\(([^)]+)\)/);

    this.DOM.el.style.transform = `translate3d(${
      this.renderedStyles['tx'].previous
    }px, ${this.renderedStyles['ty'].previous}px, 0) ${
      rotate ? rotate[0] : ''
    }`;

    if (this.DOM.text) {
      (this.DOM.text as HTMLElement).style.transform = `translate3d(${
        -this.renderedStyles['tx'].previous * 0.6
      }px, ${-this.renderedStyles['ty'].previous * 0.6}px, 0)`;
    }

    cancelAnimationFrame(this.animation);
    this.animation = requestAnimationFrame(() => this.render());
  }
  enter(): void {
    this.state.hover = true;
    this.DOM.el.classList.add('hover');
  }
  leave(): void {
    this.state.hover = false;
    this.DOM.el.classList.remove('hover');
  }
}
