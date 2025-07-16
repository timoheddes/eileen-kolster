import { useEffect, useRef, useState } from 'react';
import { getRandomPosition } from '../../utils';
import MagneticWrapper from '../Magnetic/MagneticWrapper';
import useWindowDimensions from '../../hooks/windowDimensions';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useLocation } from 'wouter';

export type ImageCollageImage = {
  file: string;
  caption?: string;
  magnetic?: boolean;
  rotate?: boolean;
  zIndex?: number;
  description?: string;
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
  const [location] = useLocation();
  const [rerender, setRerender] = useState(false);
  const [adjustImageSize, setAdjustImageSize] = useState<number>(0);
  const [largestImage, setLargestImage] = useState<number>(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const grid = useRef<HTMLDivElement>(null);

  useWindowSize();
  const { width: screenWidth } = useWindowDimensions();

  // Horizontal sizing
  useEffect(() => {
    setRerender(false);
    let adjustImageSize =
      Math.round(screenWidth / images.length) * 1.2;
    adjustImageSize =
      adjustImageSize > imageSize ? imageSize : adjustImageSize;
    setAdjustImageSize(adjustImageSize);
  }, [images, imageSize, screenWidth, rerender]);

  // Vertical sizing
  useEffect(() => {
    setRerender(false);
    const imageSizes: number[] = [];
    refs.current.forEach((el) => {
      if (el) {
        imageSizes.push(el.offsetHeight);
      }
    });
    const largestImage = Math.max(...imageSizes);
    setLargestImage(largestImage);
  }, [refs, largestImage, screenWidth, rerender]);

  useEffect(() => {
    function handleResize() {
      setRerender(true);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      key={location}
    >
      {images.map((image, index) => (
        <MagneticWrapper
          force={magnetic ? 0.1 : 0}
          style={{
            zIndex: image.zIndex,
          }}
          key={index}
        >
          <figure
            className="image-border overlay"
            ref={(element) => {
              refs.current[index] = element;
            }}
            key={index}
            style={{
              ...getRandomPosition(
                index,
                adjustImageSize,
                rotate,
                'auto',
                image.zIndex,
                'absolute'
              ),
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
            <img
              src={image.file}
              alt={image.description || image.caption}
              onLoad={() => setRerender(true)}
            />
          </figure>
        </MagneticWrapper>
      ))}
    </div>
  );
};

export default ImageCollage;
