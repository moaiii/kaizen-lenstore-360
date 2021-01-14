import React, { useEffect, useState } from 'react';
import { images } from '../assets';

export default (props) => {
  const [cityImage, setCityImage] = useState();
  const [overlayImage, setOverLayImage] = useState();

  const { cities, condition } = props;

  const selectedCity = cities.CITIES[cities.selectedCity];

  console.log({ selectedCity, condition });

  /**
   * Overlay image
   */
  useEffect(() => {
    const overlayConditions = [
      'eye floaters',
      'glaucoma',
      'macular degeneration',
      'retinitis pigmentosa',
      'tunnel vision',
    ];

    const isOverlay = overlayConditions.indexOf(condition);

    if (isOverlay > -1) {
      setOverLayImage(images.overlay[condition]);
      setCityImage(images[selectedCity].normal);
      console.log('fetching over lay for ', condition);
    } else {
      setOverLayImage(false);
    }

    if (isOverlay === -1) {
      setOverLayImage(false);
      setCityImage(images[selectedCity][condition]);
    }
  }, [selectedCity, condition]);

  return (
    <div className="Gallery">
      <img
        className={`city --${condition}`}
        src={cityImage}
        alt={selectedCity}
      />
      {overlayImage && (
        <div
          className="condition"
          style={{ backgroundImage: `url(${overlayImage})` }}
        />
      )}
    </div>
  );
};
