import React, { useEffect, useState, useMemo } from 'react';
import { Pannellum } from 'pannellum-react';
import { images } from '../assets';

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
      {vrIsOn && (
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
      )}
      {!vrIsOn && (
        <Pannellum
          width="100%"
          height="100%"
          image={cityImage}
          pitch={10}
          yaw={180}
          hfov={120}
          showControls={false}
          autoLoad
          onLoad={() => {
            setIsLoading(false);
          }}
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
