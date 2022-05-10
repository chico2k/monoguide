import React from 'react';
import { MdStarBorder, MdStar, MdStarHalf } from 'react-icons/md';
import { IconContext } from 'react-icons';

interface Props {
  currentRating: number;
}

const fullIconStyling = {
  size: '1.2rem',
  color: '#F59E0B',
  className: 'react-icons',
};

const emptyIconStyling = {
  size: '1.2rem',
  color: '#F59E0B',
  className: 'react-icons opacity-40',
};

const greyIconStyling = {
  size: '1.2rem',
  color: 'grey',
  className: 'react-icons',
};

// eslint-disable-next-line no-shadow
const RatingComponent = ({ currentRating }: Props) => {
  let rating: React.ReactNode;

  if (!currentRating) {
    rating = (
      <>
        <IconContext.Provider value={greyIconStyling}></IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating > 0 && currentRating < 1.25) {
    rating = (
      <>
        <IconContext.Provider value={fullIconStyling}>
          <MdStar />
        </IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating >= 1.25 && currentRating < 1.75) {
    rating = (
      <>
        <IconContext.Provider value={fullIconStyling}>
          <MdStar />
          <MdStarHalf />
        </IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating >= 1.75 && currentRating < 2.25) {
    rating = (
      <>
        <IconContext.Provider value={fullIconStyling}>
          <MdStar />
          <MdStar />
        </IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating >= 2.25 && currentRating < 2.75) {
    rating = (
      <>
        <IconContext.Provider value={fullIconStyling}>
          <MdStar />
          <MdStar />
          <MdStarHalf />
        </IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating >= 2.75 && currentRating < 3.25) {
    rating = (
      <>
        <IconContext.Provider value={fullIconStyling}>
          <MdStar />
          <MdStar />
          <MdStar />
        </IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating >= 3.25 && currentRating < 3.75) {
    rating = (
      <>
        <IconContext.Provider value={fullIconStyling}>
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStarHalf />
        </IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating >= 3.75 && currentRating < 4.25) {
    rating = (
      <>
        <IconContext.Provider value={fullIconStyling}>
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
        </IconContext.Provider>
        <IconContext.Provider value={emptyIconStyling}>
          <MdStarBorder />
        </IconContext.Provider>
      </>
    );
  }

  if (currentRating >= 4.25 && currentRating < 4.75) {
    rating = (
      <IconContext.Provider value={fullIconStyling}>
        <MdStar />
        <MdStar />
        <MdStar />
        <MdStar />
        <MdStarHalf />
      </IconContext.Provider>
    );
  }

  if (currentRating >= 4.75) {
    rating = (
      <IconContext.Provider value={fullIconStyling}>
        <MdStar />
        <MdStar />
        <MdStar />
        <MdStar />
        <MdStar />
      </IconContext.Provider>
    );
  }

  return <div className="flex">{rating}</div>;
};

export default RatingComponent;
