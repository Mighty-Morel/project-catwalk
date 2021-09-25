import React from 'react';
import './reviewlist.css';
import 'font-awesome/css/font-awesome.min.css';

const ratingBreakdown = ({
  ratings, totalRatings, setFilter,
}) => {
  const [ones, twos, threes, fours, fives] = ratings;
  const ratingPercent = (number) => (
    `${(number / totalRatings) * 100}`
  );
  return (
    <>
      <div className="ratingTitle">
        <option
          className="RLratingfilter"
          onClick={() => setFilter((prevState) => ({ ...prevState, 5: !prevState['5'] }))}
        >
          5 stars
        </option>
        <progress value={ratingPercent(fives)} max="100" />
      </div>
      <div className="ratingTitle">
        <option
          className="RLratingfilter"
          onClick={() => setFilter((prevState) => ({ ...prevState, 4: !prevState['4'] }))}
        >
          4 stars
        </option>
        <progress value={ratingPercent(fours)} max="100" />
      </div>
      <div className="ratingTitle">
        <option
          className="RLratingfilter"
          onClick={() => setFilter((prevState) => ({ ...prevState, 3: !prevState['3'] }))}
        >
          3 stars
        </option>
        <progress value={ratingPercent(threes)} max="100" />
      </div>
      <div className="ratingTitle">
        <option
          className="RLratingfilter"
          onClick={() => setFilter((prevState) => ({ ...prevState, 2: !prevState['2'] }))}
        >
          2 stars
        </option>
        <progress value={ratingPercent(twos)} max="100" />
      </div>
      <div className="ratingTitle">
        <option
          className="RLratingfilter"
          onClick={() => setFilter((prevState) => ({ ...prevState, 1: !prevState['1'] }))}
        >
          1 stars
        </option>
        <progress value={ratingPercent(ones)} max="100" />
      </div>
    </>
  );
};

export default ratingBreakdown;
