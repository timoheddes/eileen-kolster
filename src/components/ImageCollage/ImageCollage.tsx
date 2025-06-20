import { useEffect, useRef, useState } from 'react';
import { getRandomPosition } from '../../utils';
import { motion } from 'motion/react';
import MagneticWrapper from '../Magnetic/MagneticWrapper';

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
  }, [ready, refs, largestImage]);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <motion.div
      className="image-grid"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delay: 0.3,
            ease: 'easeOut',
          },
        },
      }}
      initial="hidden"
      animate="visible"
      ref={grid}
      style={{
        height: `${largestImage}px`,
        minHeight: `${imageSize * 1.35}px`,
      }}
    >
      {images.map((image, index) => (
        <MagneticWrapper
          force={magnetic ? 0.1 : 0}
          style={{ zIndex: image.zIndex }}
        >
          <motion.figure
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                },
              },
            }}
            className="image-border overlay"
            ref={(element) => {
              refs.current[index] = element;
            }}
            key={index}
            style={{
              ...getRandomPosition(index, imageSize, rotate),
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
        </MagneticWrapper>
      ))}
    </motion.div>
  );
};

export default ImageCollage;
