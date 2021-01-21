import React from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

export default (props) => {
  const { cities, next, previous, copy, lang } = props;

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
        <div className="arrow --left">
          <IoIosArrowDropleft />
        </div>
        {copy.cities[lang][previousCity]}
      </button>
      <div className="city-selected">
        <p className="name">{copy.cities[lang][thisCity]}</p>
        <div className="position">( {cities.selectedCity + 1} / 7 )</div>
      </div>
      <button type="button" className="direction-button" onClick={() => next()}>
        <div className="arrow --right">
          <IoIosArrowDropright />
        </div>
        {copy.cities[lang][nextCity]}
      </button>
    </div>
  );
};
