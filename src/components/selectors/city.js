import React from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

export default (props) => {
  const { cities, next, previous } = props;

  const thisCity = cities.CITIES[cities.selectedCity];
  const nextCity = cities.CITIES[cities.nextCity];
  const previousCity = cities.CITIES[cities.previousCity];

  return (
    <div className="CitySelector">
      <button
        type="button"
        className="direction-button"
        onClick={() => previous()}
      >
        <IoIosArrowDropleft />
        {previousCity}
      </button>
      <div className="city-selected">
        <p className="name">{thisCity}</p>
        <div className="position">( {cities.selectedCity + 1} / 7 )</div>
      </div>
      <button type="button" className="direction-button" onClick={() => next()}>
        <IoIosArrowDropright />
        {nextCity}
      </button>
    </div>
  );
};
