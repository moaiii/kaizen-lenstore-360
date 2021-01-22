import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { VscLoading } from 'react-icons/vsc';
import { AiFillCloseSquare } from 'react-icons/ai';
import { get } from 'lodash';
import {
  setVrIsOn,
  selectCondition,
  nextCity,
  previousCity,
  setInfoIsVisible,
} from '../redux';
import CitySelector from './selectors/city';
import ConditionSelector from './selectors/condition';
import VrSelector from './selectors/vr';
import Gallery from './Gallery';
import IntroScreen from './intro';
import SocialShare from './Share';
import Description from './Description';

const Layout = (props) => {
  const { lang, copy } = props;
  const [hasEnteredVrMode, setHasEnteredVrMode] = useState(false);
  const [denyButton, setDenyButton] = useState(false);
  const [allowButton, setAllowButton] = useState(false);
  const [vrIsOnRender, setVrIsOnRender] = useState();
  const [userDeniedDeviceVrSensors, setUserDeniedDeviceVrSensors] = useState(
    false,
  );
  const [userAllowDeviceVrSensors, setUserAllowDeviceVrSensors] = useState(
    false,
  );
  const [appearDescription, setAppearDescription] = useState(false);
  const [isVrDisplay, setIsVrDisplay] = useState(false);

  useEffect(() => {
    setVrIsOnRender(props.application.vrIsOn);
  }, [props.application.vrIsOn]);

  /**
   *
   *
   * Enter VR mode
   */
  const handleEnterVrMode = () => {
    setHasEnteredVrMode(true);
  };

  /**
   *
   *
   * Close the VR full screen ?
   */
  const handleExitVrMode = () => {
    const aScene = document.querySelector('a-scene');

    if (aScene) {
      setHasEnteredVrMode(false);
      aScene.exitVR();
    }
  };

  /**
   *
   *
   * Did user deny sensors ?
   */
  useEffect(() => {
    if (!denyButton) {
      const denyButtonElement = document.getElementsByClassName(
        'a-dialog-deny-button',
      );

      if (denyButtonElement.length > 0) {
        setDenyButton(denyButtonElement[0]);
        denyButtonElement[0].addEventListener('click', () => {
          setUserDeniedDeviceVrSensors(true);
          localStorage.setItem('userHasSetVrPermissions', true);
        });
      }
    }
  });

  /**
   *
   *
   * Did user accept sensors ?
   */
  useEffect(() => {
    if (!allowButton) {
      const allowButtonElement = document.getElementsByClassName(
        'a-dialog-allow-button',
      );

      if (allowButtonElement.length > 0) {
        setAllowButton(allowButtonElement[0]);
        allowButtonElement[0].addEventListener('click', () => {
          setUserAllowDeviceVrSensors(true);
          localStorage.setItem('userHasSetVrPermissions', true);
        });
      }
    }
  });

  /**
   *
   *
   * Is device VR ?
   */
  useEffect(async () => {
    const vrd = AFRAME.utils.device.getVRDisplay();
    const vrDeviceName = get(vrd, 'displayName', false);
    if (typeof vrDeviceName === 'string' && vrDeviceName.length > 0) {
      setIsVrDisplay(true);
    }
  }, []);

  /**
   *
   *
   * Make description appear
   */
  useEffect(async () => {
    const userHasSetVrPermissions = localStorage.getItem(
      'userHasSetVrPermissions',
    );

    if (!props.application.infoIsVisible) {
      if (isVrDisplay) {
        if (
          userDeniedDeviceVrSensors ||
          userAllowDeviceVrSensors ||
          userHasSetVrPermissions
        ) {
          await new Promise((r) => setTimeout(r, 1500));
          setAppearDescription(true);
        }
      }

      if (!isVrDisplay) {
        await new Promise((r) => setTimeout(r, 1500));
        setAppearDescription(true);
      }
    }
  }, [
    props.application.infoIsVisible,
    isVrDisplay,
    userDeniedDeviceVrSensors,
    userAllowDeviceVrSensors,
  ]);

  /**
   *
   *
   * Special CSS classes
   */
  const vrModeEnabledClassMod = hasEnteredVrMode ? '--in-vr' : '';

  const vrSensorsDeniedClassMod = userDeniedDeviceVrSensors
    ? '--vr-denied'
    : '';

  /**
     *   const modalDisplayStyle =
    !appearDescription &&
    window.mobileCheck() === true &&
    !props.application.infoIsVisible
      ? {
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          top: 0,
          left: 0,
        }
      : null;
     */

  return (
    <div className={`Layout ${vrModeEnabledClassMod}`}>
      <button
        className={`exit-vr-mode-button ${vrModeEnabledClassMod}`}
        type="button"
        onClick={() => handleExitVrMode()}
      >
        <AiFillCloseSquare />
      </button>

      <div
        className={`TopControls ${vrSensorsDeniedClassMod}`}
        id="top-controls"
      >
        {appearDescription && (
          <ConditionSelector
            copy={copy}
            lang={lang}
            conditions={props.conditions}
            handleConditionSelect={props.selectCondition}
          />
        )}
        <div className="rhs" id="vr-share-container">
          {appearDescription && (
            <SocialShare
              isMobile={props.application.isMobile}
              setInfoIsVisible={props.setInfoIsVisible}
            />
          )}
          <VrSelector vrIsOn={vrIsOnRender} setVrIsOn={props.setVrIsOn} />
        </div>
      </div>
      <Gallery
        cities={props.cities}
        condition={props.conditions.condition}
        vrIsOn={vrIsOnRender}
        hasEnteredVrMode={hasEnteredVrMode}
        handleEnterVrMode={handleEnterVrMode}
        userDeniedDeviceVrSensors={userDeniedDeviceVrSensors}
      />
      {appearDescription && (
        <CitySelector
          copy={copy}
          lang={lang}
          cities={props.cities}
          next={props.nextCity}
          previous={props.previousCity}
        />
      )}
      <IntroScreen
        copy={copy}
        lang={lang}
        cities={props.cities}
        setInfoIsVisible={props.setInfoIsVisible}
        infoIsVisible={props.application.infoIsVisible}
      />
      <VscLoading className="loading-spinner" />
      {appearDescription && (
        <Description
          copy={copy}
          lang={lang}
          infoIsVisible={props.application.infoIsVisible}
          condition={props.conditions.condition}
        />
      )}
    </div>
  );
};

const mapState = (state) => ({
  cities: state.cities,
  conditions: state.conditions,
  application: state.application,
});

const mapDispatch = {
  setInfoIsVisible,
  setVrIsOn,
  selectCondition,
  nextCity,
  previousCity,
};

export default connect(mapState, mapDispatch)(Layout);
