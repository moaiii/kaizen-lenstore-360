import React, { useEffect, useState } from 'react';
import { Pannellum } from 'pannellum-react';
import { images } from '../assets';
import useDrag from '../useDrag';

export default (props) => {
  const [cityImage, setCityImage] = useState();
  const [overlayImage, setOverLayImage] = useState();
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const { cities, condition, vrIsOn } = props;

  const selectedCity = cities.CITIES[cities.selectedCity];

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
    } else {
      setOverLayImage(false);
    }

    if (isOverlay === -1) {
      setOverLayImage(false);
      setCityImage(images[selectedCity][condition]);
    }
  }, [selectedCity, condition]);

  console.log(mouseCoordinates);

  return (
    <div className="Gallery">
      {vrIsOn && (
        <Pannellum
          width="100%"
          height="100%"
          image={cityImage}
          pitch={0}
          yaw={90}
          hfov={110}
          showControls={false}
          autoLoad
          orientationOnByDefault={vrIsOn}
        />
      )}
      {!vrIsOn && (
        <Pannellum
          width="100%"
          height="100%"
          image={cityImage}
          pitch={10}
          yaw={180}
          hfov={110}
          showControls={false}
          autoLoad
        />
      )}
      {overlayImage && (
        <div
          className="condition"
          style={{ backgroundImage: `url(${overlayImage})` }}
        />
      )}
    </div>
  );
};
