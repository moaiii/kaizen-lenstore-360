/* eslint-disable */
import React, { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

export default (props) => {
  const { cities, next, previous, copy, lang } = props;

  const thisCity = cities.CITIES[cities.selectedCity];
  const nextCity = cities.CITIES[cities.nextCity];
  const previousCity = cities.CITIES[cities.previousCity];

  const [hoverOverButton, setHoverOverButton] = useState('');

  return (
    <div className="CitySelector" id="city-selector">
      <button
        style={{
          opacity:
            hoverOverButton === 'previous' && window.mobileCheck() === false
              ? '0.2'
              : '1',
        }}
        onMouseOver={() => setHoverOverButton('next')}
        onMouseLeave={() => setHoverOverButton('')}
        type="button"
        className="direction-button"
        onClick={() => previous()}
      >
        <div className="arrow --left">
          <IoIosArrowDropleft />
        </div>
        {copy.cities[lang][previousCity]}
      </button>
      <div
        className="city-selected"
        style={{
          opacity:
            hoverOverButton !== '' && window.mobileCheck() === false
              ? '0.2'
              : '1',
        }}
      >
        <p className="name">{copy.cities[lang][thisCity]}</p>
        <div className="position">( {cities.selectedCity + 1} / 7 )</div>
      </div>
      <button
        type="button"
        className="direction-button"
        onClick={() => next()}
        onMouseOver={() => setHoverOverButton('previous')}
        onMouseLeave={() => setHoverOverButton('')}
        style={{
          opacity:
            hoverOverButton === 'next' && window.mobileCheck() === false
              ? '0.2'
              : '1',
        }}
      >
        <div className="arrow --right">
          <IoIosArrowDropright />
        </div>
        {copy.cities[lang][nextCity]}
      </button>
    </div>
  );
};
