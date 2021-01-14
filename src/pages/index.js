import React from 'react';
import { connect } from 'react-redux';
import { setVrIsOn, selectCondition, nextCity, previousCity } from '../redux';
import CitySelector from '../components/selectors/city';
import ConditionSelector from '../components/selectors/condition';
import VrSelector from '../components/selectors/vr';
import Gallery from '../components/Gallery';

const Layout = (props) => {
  console.log({ props });

  return (
    <div className="Layout">
      <div className="TopControls">
        <ConditionSelector
          conditions={props.conditions}
          handleConditionSelect={props.selectCondition}
        />
        <VrSelector
          vrIsOn={props.application.vrIsOn}
          setVrIsOn={props.setVrIsOn}
        />
      </div>
      <Gallery cities={props.cities} condition={props.conditions.condition} />
      <CitySelector
        cities={props.cities}
        next={props.nextCity}
        previous={props.previousCity}
      />
    </div>
  );
};

const mapState = (state) => ({
  cities: state.cities,
  conditions: state.conditions,
  application: state.application,
});

const mapDispatch = { setVrIsOn, selectCondition, nextCity, previousCity };

export default connect(mapState, mapDispatch)(Layout);
