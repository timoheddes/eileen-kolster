/**
 * Scroll to an element
 * @param {string} element selector passed to querySelector
 * @param {boolean} smooth use smooth scrolling if supported
 * @param {number} delay time to wait before scrolling in ms
 */
export const scrollToElement = (
  element: string,
  smooth = true,
  delay = 0
): ReturnType<typeof setTimeout> =>
  setTimeout(() => {
    const domElement: HTMLElement | null =
      document.querySelector(element);
    if (domElement) {
      requestAnimationFrame(() =>
        domElement.scrollIntoView({
          behavior: smooth ? 'smooth' : 'auto',
          block: 'center',
          inline: 'center',
        })
      );
    }
  }, delay);

export const getRandomPosition = (
  index: number,
  imageSize: number,
  rotate: boolean,
  zIndex?: number
) => {
  const leftOffset = index < 2 ? 0 : index * 10;
  return {
    top: `${Math.random() * 5}%`,
    left: `calc(${
      index * (Math.random() * 0.3 + 0.7 * imageSize) - leftOffset
    }px)`,
    transform: rotate
      ? `rotate(${Math.random() < 0.5 ? '-' : ''}${
          Math.random() * 5
        }deg)`
      : 'none',
    zIndex: zIndex || Math.round(Math.random() * 10),
    // width: gridWidth ? gridWidth / imagesLength : '100%',
  };
};
