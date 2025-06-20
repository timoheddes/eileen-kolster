import { useEffect, useRef, useState } from 'react';
import { getRandomPosition } from '../../utils';
import MagneticController from '../Magnetic/controller';
import { motion } from 'motion/react';
import { opacity, stagger } from '../../animations';

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
  const [largestImage, setLargestImage] = useState<number>(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    refs.current.forEach((el) => {
      if (el) {
        const height = el.getBoundingClientRect().height;
        if (height > largestImage) {
          setLargestImage(Math.round(height));
        }
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          refs.current.forEach((el) => {
            if (el) {
              if (magnetic) {
                new MagneticController(el, 'normal');
              }
            }
          });
        }
      },
      {
        threshold: 1,
      }
    );
    if (grid.current) {
      observer.observe(grid.current);
    }
  }, [ready, refs, magnetic, largestImage]);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <motion.div
      className="image-grid"
      // Pass the variants object to the component
      variants={stagger}
      // Tell it to start in the "hidden" state
      initial="hidden"
      // Animate to the "visible" state when it mounts
      animate="visible"
      ref={grid}
      style={{
        height: `${largestImage}px`,
        minHeight: `${imageSize * 1.35}px`,
      }}
    >
      {images.map((image, index) => (
        <motion.figure
          variants={opacity}
          className="image-border overlay"
          ref={(element) => {
            refs.current[index] = element;
          }}
          key={index}
          style={{
            ...getRandomPosition(
              index,
              imageSize,
              rotate,
              image.zIndex
            ),
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
        </motion.figure>
      ))}
    </motion.div>
  );
};

export default ImageCollage;
