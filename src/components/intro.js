import React, { useState } from 'react';
import { RiDragMoveLine } from 'react-icons/ri';
import copy from '../assets/copy.json';
import { images } from '../assets';

export default (props) => {
  const { setInfoIsVisible, infoIsVisible, cities } = props;
  const hideClasMod = !infoIsVisible ? '--hide' : '';
  const thisCity = cities.CITIES[cities.selectedCity];

  return (
    <div className={`Intro ${hideClasMod}`}>
      <div
        className="blur"
        style={{ backgroundImage: `url(${images[thisCity].normal})` }}
      />
      <div className="inner-container">
        <div className="content">
          <h2>{copy.intro.title}</h2>
          <p>{copy.intro.blurb1}</p>
          <p>{copy.intro.blurb2}</p>
        </div>
        <div className="button-bar">
          <div className="icon">
            <RiDragMoveLine />
            {/* <FaRegHandPointer /> */}
          </div>
          <button type="button" onClick={() => setInfoIsVisible()}>
            {copy.intro.cta}
          </button>
        </div>
      </div>
    </div>
  );
};
