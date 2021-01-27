import React from 'react';
import drag from '../assets/icons/drag.svg';
import { images } from '../assets';

export default (props) => {
  const { setInfoIsVisible, infoIsVisible, cities, copy, lang } = props;
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
          <h2>{copy.intro[lang].title}</h2>
          <p>{copy.intro[lang].blurb1}</p>
          <p>{copy.intro[lang].blurb2}</p>
          <p>{copy.intro[lang].blurb3}</p>
        </div>
        <div className="button-bar">
          <div className="icon">
            <img src={drag} alt="lenstore-drag" />
          </div>
          <button type="button" onClick={() => setInfoIsVisible()}>
            {copy.intro[lang].cta}
          </button>
        </div>
      </div>
    </div>
  );
};
