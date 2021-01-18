/* eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';
import { Pannellum } from 'pannellum-react';
import { Entity, Scene } from 'aframe-react';
import { images } from '../assets';

require('aframe');

export default (props) => {
  const [cityImage, setCityImage] = useState();
  const [overlayImage, setOverLayImage] = useState();
  const { cities, condition, vrIsOn } = props;
  const selectedCity = cities.CITIES[cities.selectedCity];
  const [isLoading, setIsLoading] = useState(false);

  const [panoImage, setPanoImage] = useState();

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

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPanoImage(cityImage);
    }, 500);
  }, [cityImage, overlayImage]);

  return (
    <div className={`Gallery ${isLoading ? '' : '--loaded'}`}>
      {/* {vrIsOn && (
        <Pannellum
          width="100%"
          height="100%"
          image={panoImage}
          pitch={0}
          yaw={90}
          hfov={120}
          showControls={false}
          autoLoad
          orientationOnByDefault={vrIsOn}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      )} */}

      <a-scene>
        <a-sky src={cityImage}></a-sky>
      </a-scene>

      {overlayImage && (
        <div
          className="condition"
          style={{ backgroundImage: `url(${overlayImage})` }}
        />
      )}
    </div>
  );
};

// const sensor = new AbsoluteOrientationSensor();
// Promise.all([
//   navigator.permissions.query({ name: 'accelerometer' }),
//   navigator.permissions.query({ name: 'magnetometer' }),
//   navigator.permissions.query({ name: 'gyroscope' }),
// ]).then((results) => {
//   if (results.every((result) => result.state === 'granted')) {
//     results[2].onchange = function (e) {
//       console.log(e);
//     };
//     sensor.start();
//     console.log({ sensor });
//   } else {
//     console.log('No permissions to use AbsoluteOrientationSensor.');
//   }
//   console.log({ results });
// });
