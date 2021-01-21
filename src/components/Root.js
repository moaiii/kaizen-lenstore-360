import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { VscLoading } from 'react-icons/vsc';
import { AiFillCloseSquare } from 'react-icons/ai';
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
  const [vrIsOnRender, setVrIsOnRender] = useState();
  const [userDeniedDeviceVrSensors, setUserDeniedDeviceVrSensors] = useState(
    false,
  );

  useEffect(() => {
    setVrIsOnRender(props.application.vrIsOn);
  }, [props.application.vrIsOn]);

  const handleEnterVrMode = () => {
    setHasEnteredVrMode(true);
  };

  const handleExitVrMode = () => {
    const aScene = document.querySelector('a-scene');

    if (aScene) {
      setHasEnteredVrMode(false);
      aScene.exitVR();
    }
  };

  useEffect(() => {
    if (!denyButton) {
      const denyButtonElement = document.getElementsByClassName(
        'a-dialog-deny-button',
      );

      if (denyButtonElement.length > 0) {
        setDenyButton(denyButtonElement[0]);
        denyButtonElement[0].addEventListener('click', () => {
          setUserDeniedDeviceVrSensors(true);
        });
      }
    }
  });

  const vrModeEnabledClassMod = hasEnteredVrMode ? '--in-vr' : '';

  const vrSensorsDeniedClassMod = userDeniedDeviceVrSensors
    ? '--vr-denied'
    : '';

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
        <ConditionSelector
          copy={copy}
          lang={lang}
          conditions={props.conditions}
          handleConditionSelect={props.selectCondition}
        />
        <div className="rhs" id="vr-share-container">
          <SocialShare
            isMobile={props.application.isMobile}
            setInfoIsVisible={props.setInfoIsVisible}
          />
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
      <CitySelector
        copy={copy}
        lang={lang}
        cities={props.cities}
        next={props.nextCity}
        previous={props.previousCity}
      />
      <IntroScreen
        copy={copy}
        lang={lang}
        cities={props.cities}
        setInfoIsVisible={props.setInfoIsVisible}
        infoIsVisible={props.application.infoIsVisible}
      />
      <VscLoading className="loading-spinner" />
      {!props.application.infoIsVisible && (
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
