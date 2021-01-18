import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useDeviceOrientation from '@rehooks/device-orientation';
import { VscLoading } from 'react-icons/vsc';
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

const Layout = (props) => {
  const [orientation, setOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamme: 0,
  });
  const [vrIsOnRender, setVrIsOnRender] = useState();

  useEffect(() => {
    setVrIsOnRender(props.application.vrIsOn);
  }, [props.application.vrIsOn]);

  const value = useDeviceOrientation();

  return (
    <div className="Layout">
      <div className="TopControls">
        {/* <div className="orientation">
          <p>Alpha: {Math.floor(value.alpha)}</p>
          <p>Beta: {Math.floor(value.beta)}</p>
          <p>Gamma: {Math.floor(value.gamma)}</p>
        </div> */}
        <ConditionSelector
          conditions={props.conditions}
          handleConditionSelect={props.selectCondition}
        />
        <div className="rhs">
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
      />
      <CitySelector
        cities={props.cities}
        next={props.nextCity}
        previous={props.previousCity}
      />
      <IntroScreen
        cities={props.cities}
        setInfoIsVisible={props.setInfoIsVisible}
        infoIsVisible={props.application.infoIsVisible}
      />
      <VscLoading className="loading-spinner" />
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
