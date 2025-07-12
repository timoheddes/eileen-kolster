declare module 'circletype' {
  interface CircleTypeOptions {
    radius?: number;
    dir?: number;
    forceHeight?: boolean;
    forceWidth?: boolean;
  }

  class CircleType {
    constructor(element: HTMLElement, options?: CircleTypeOptions);
    radius(radius: number): CircleType;
    dir(direction: number): CircleType;
    forceHeight(force: boolean): CircleType;
    forceWidth(force: boolean): CircleType;
    destroy(): void;
  }

  export = CircleType;
}
