import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getRandomPosition } from '../../utils';
import MagneticWrapper from '../Magnetic/MagneticWrapper';
import useWindowDimensions from '../../hooks/windowDimensions';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useLocation } from 'wouter';
import './ImageCollage.css';

export type ImageCollageImage = {
  file: string;
  caption?: string;
  magnetic?: boolean;
  zoom?: boolean;
  rotate?: boolean;
  zIndex?: number;
  description?: string;
};

interface ImageCollageProps {
  images: ImageCollageImage[];
  magnetic?: boolean;
  zoom?: boolean;
  imageSize?: number;
  rotate?: boolean;
}

const ImageCollage = memo(function ImageCollage({
  images,
  magnetic = false,
  zoom = false,
  imageSize = 300,
  rotate = false,
}: ImageCollageProps) {
  const [location] = useLocation();
  const [rerender, setRerender] = useState(false);
  const [adjustImageSize, setAdjustImageSize] = useState<number>(0);
  const [largestImage, setLargestImage] = useState<number>(0);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
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

  const handleResize = useCallback(() => {
    setRerender(true);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleImageLoad = useCallback(() => {
    setRerender(true);
  }, []);

  // Lightbox: lock body scroll and close on ESC
  useEffect(() => {
    if (zoomedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedIndex(null);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedIndex]);

  const openLightbox = useCallback((index: number) => {
    setZoomedIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setZoomedIndex(null);
  }, []);

  return (
    <>
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
        {images.map((image, index) => {
          const isZoomable = zoom || image.zoom;
          return (
            <MagneticWrapper
              force={magnetic ? 0.1 : 0}
              style={{
                zIndex: image.zIndex,
              }}
              key={index}
            >
              <figure
                className={`image-border overlay${
                  isZoomable ? ' image-zoom' : ''
                }`}
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
                onClick={
                  isZoomable
                    ? () => openLightbox(index)
                    : undefined
                }
              >
                <figcaption>{image.caption}</figcaption>
                <img
                  src={image.file}
                  alt={image.description || image.caption}
                  loading="lazy"
                  onLoad={handleImageLoad}
                />
              </figure>
            </MagneticWrapper>
          );
        })}
      </div>

      {zoomedIndex !== null &&
        createPortal(
          <div
            className="image-lightbox"
            onClick={closeLightbox}
          >
            <img
              className="image-lightbox-img"
              src={images[zoomedIndex].file}
              alt={
                images[zoomedIndex].description ||
                images[zoomedIndex].caption
              }
            />
          </div>,
          document.body
        )}
    </>
  );
});

export default ImageCollage;
