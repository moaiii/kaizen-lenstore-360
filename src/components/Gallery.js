/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Pannellum } from 'pannellum-react';
import { images } from '../assets';
import { get } from 'lodash';

export default (props) => {
  const {
    cities,
    condition,
    vrIsOn,
    handleEnterVrMode,
    userDeniedDeviceVrSensors,
    hasEnteredVrMode,
  } = props;

  const [isVrDisplay, setIsVrDisplay] = useState(false);
  const [cityImage, setCityImage] = useState();
  const [overlayImage, setOverLayImage] = useState();
  const selectedCity = cities.CITIES[cities.selectedCity];
  const [isLoading, setIsLoading] = useState(false);
  const [panoImage, setPanoImage] = useState();
  const [sceneElement, setSceneElement] = useState(null);

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

  useEffect(async () => {
    const vrd = AFRAME.utils.device.getVRDisplay();
    const vrDeviceName = get(vrd, 'displayName', false);

    if (typeof vrDeviceName === 'string' && vrDeviceName.length > 0) {
      setIsVrDisplay(true);
    } else {
      document.getElementById('vr-share-container').classList.add('--no-vr');
      document.getElementById('top-controls').classList.add('--no-vr');
      setIsVrDisplay(false);
    }
  }, []);

  useEffect(() => {
    if (!sceneElement) {
      const aScene = document.querySelector('a-scene');
      if (aScene) {
        setSceneElement(aScene);
        aScene.addEventListener('enter-vr', () => {
          handleEnterVrMode();
        });
      }
    }
  });

  const doubleConditionClassMod = hasEnteredVrMode ? '--vr-condition-view' : '';

  return (
    <div className={`Gallery ${isLoading ? '' : '--loaded'}`} id="gallery">
      {isVrDisplay && !userDeniedDeviceVrSensors ? (
        <a-scene cursor="rayOrigin: mouse">
          <a-sky camera look-controls mouse-cursor src={cityImage}></a-sky>
        </a-scene>
      ) : (
        <Pannellum
          width="100%"
          height="100%"
          image={panoImage}
          pitch={0}
          yaw={90}
          hfov={130}
          showControls={false}
          autoLoad
          orientationOnByDefault={vrIsOn}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      )}
      {overlayImage && (
        <div
          className={`condition ${doubleConditionClassMod}`}
          style={{ backgroundImage: `url(${overlayImage})` }}
        />
      )}
      {overlayImage && hasEnteredVrMode && (
        <div
          className={`condition ${doubleConditionClassMod}`}
          style={{ backgroundImage: `url(${overlayImage})` }}
        />
      )}
    </div>
  );
};
