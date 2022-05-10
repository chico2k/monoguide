import React, { useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import ImagePreviewCard from '../ImagePreviewCard';

interface IProps {}

export const ImagePreview: React.FC<IProps> = () => {
  const [isMoving, setMoving] = useState(false);
  const carousel = useRef<any>();

  // Carousel Settings
  const settings = {
    beforeChange: () => setMoving(true),
    afterChange: () => setMoving(false),
    removeArrowOnDeviceType: ['desktop', 'tablet', 'mobile'],
    containerClass: 'react-multi-carousel-list flex-auto',
    ref: carousel,
    renderButtonGroupOutside: true,
    partialVisible: true,
    infinite: true,

    responsive: {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        paritialVisibilityGutter: 50,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30,
      },
    },
    draggable: true,
  };

  return (
    <div className="flex">
      <button
        onClick={() => {
          carousel?.current?.previous();
        }}
      >
        Click me
      </button>
      <Carousel {...settings}>{ImagePreviewCard({ isMoving })}</Carousel>
      <button
        onClick={() => {
          carousel?.current?.next();
        }}
      >
        Click me
      </button>
    </div>
  );
};
