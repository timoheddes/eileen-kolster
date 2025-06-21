import { useCallback, useEffect, useRef, useState } from 'react';
import { getRandomPosition } from '../../utils';
import MagneticWrapper from '../Magnetic/MagneticWrapper';
import useWindowDimensions from '../../hooks/windowDimensions';

export type ImageCollageImage = {
  file: string;
  caption?: string;
  magnetic?: boolean;
  rotate?: boolean;
  zIndex?: number;
};

const ImageCollage = ({
  images,
  magnetic = false,
  imageSize = 300,
  rotate = false,
}: {
  images: ImageCollageImage[];
  magnetic?: boolean;
  imageSize?: number;
  rotate?: boolean;
}) => {
  const [ready, setReady] = useState(false);
  const [recalculate, setRecalculate] = useState(false);
  const [largestImage, setLargestImage] = useState<number>(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const grid = useRef<HTMLDivElement>(null);

  const calculateLargestImage = useCallback(() => {
    refs.current.forEach((el) => {
      if (el) {
        const height = el.getBoundingClientRect().height;
        if (height > largestImage) {
          setLargestImage(Math.round(height));
        }
      }
    });
  }, [refs, largestImage]);

  const { width: screenWidth } = useWindowDimensions();
  let adjustImageSize = Math.round(screenWidth / images.length) * 1.2;
  adjustImageSize =
    adjustImageSize > imageSize ? imageSize : adjustImageSize;

  useEffect(() => {
    if (!ready) return;
    calculateLargestImage();
  }, [ready, refs, largestImage, calculateLargestImage]);

  useEffect(() => {
    if (recalculate) {
      calculateLargestImage();
    }
  }, [recalculate, calculateLargestImage]);

  useEffect(() => {
    setReady(true);
    setTimeout(() => {
      setRecalculate(true);
    }, 100);
  }, []);

  return (
    <div
      className="image-grid"
      ref={grid}
      style={{
        height: `${
          largestImage > adjustImageSize
            ? adjustImageSize
            : largestImage
        }px`,
        minHeight: `${largestImage}px`,
      }}
    >
      {images.map((image, index) => (
        <MagneticWrapper
          force={magnetic ? 0.1 : 0}
          style={{ zIndex: image.zIndex }}
          key={index}
        >
          <figure
            className="image-border overlay"
            ref={(element) => {
              refs.current[index] = element;
            }}
            key={index}
            style={{
              ...getRandomPosition(index, adjustImageSize, rotate),
              width: `${adjustImageSize}px`,
            }}
            onMouseEnter={() => {
              refs.current[index]?.classList.add('hover');
            }}
            onMouseLeave={() => {
              refs.current[index]?.classList.remove('hover');
            }}
          >
            <figcaption>{image.caption}</figcaption>
            <img src={image.file} alt={image.caption} />
          </figure>
        </MagneticWrapper>
      ))}
    </div>
  );
};

export default ImageCollage;
