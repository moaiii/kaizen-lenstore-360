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
    appearDescription,
  } = props;

  const [isVrDisplay, setIsVrDisplay] = useState(false);
  const [cityImage, setCityImage] = useState();
  const [overlayImage, setOverLayImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [panoImage, setPanoImage] = useState();
  const [sceneElement, setSceneElement] = useState(null);

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

  const getPanellumStartingYaw = (city) => {
    const yaws = {
      dubai: 30,
      'new york': 0,
      sydney: 110,
      paris: 0,
      venice: 0,
      london: -60,
      'hong kong': 0,
    };

    return get(yaws, city, 0);
  };

  const getPanellumStartingPitch = (city) => {
    const pitch = {
      dubai: 40,
      'new york': 25,
      sydney: 0,
      paris: 15,
      venice: 10,
      london: 15,
      'hong kong': 0,
    };

    return get(pitch, city, 0);
  };

  const aFrameStartingRotation = {
    dubai: '0 -65 0',
    'new york': '0 -90 0',
    sydney: '0 25 0',
    paris: '0 -95 0',
    venice: '0 0 0',
    london: '10 210 0',
    'hong kong': '0 -90 0',
  };

  useEffect(() => {
    if (isVrDisplay && !userDeniedDeviceVrSensors) {
      const footerElem = document.getElementById('footer');
      footerElem && footerElem.classList.add('footer-overide');

      const layoutElem = document.getElementById('layout');
      layoutElem && layoutElem.classList.add('layout-overide');

      const introElem = document.getElementById('intro');
      introElem && introElem.classList.add('intro-overide');
    }
  }, [isVrDisplay, userDeniedDeviceVrSensors]);

  useEffect(() => {
    if (appearDescription && isVrDisplay && !userDeniedDeviceVrSensors) {
      const citySelectorElem = document.getElementById('city-selector');
      citySelectorElem &&
        citySelectorElem.classList.add('city-selector-overide');

      const descriptionElem = document.getElementById('description');
      descriptionElem && descriptionElem.classList.add('description-overide');
    }
  }, [appearDescription, isVrDisplay, userDeniedDeviceVrSensors]);

  return (
    <div className={`Gallery ${isLoading ? '' : '--loaded'}`} id="gallery">
      {/* {isVrDisplay && !userDeniedDeviceVrSensors ? ( */}
      <a-scene>
        <a-sky
          rotation={get(aFrameStartingRotation, selectedCity, '0 0 0')}
          src={cityImage}
        ></a-sky>
      </a-scene>
      {/* ) : (
        <Pannellum
          width="100%"
          height="100%"
          image={panoImage}
          pitch={getPanellumStartingPitch(selectedCity)}
          yaw={getPanellumStartingYaw(selectedCity)}
          hfov={100}
          minHfov={50}
          maxHfov={110}
          showControls={false}
          autoLoad
          orientationOnByDefault={vrIsOn}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      )} */}
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
