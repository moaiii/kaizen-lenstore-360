import React from 'react';
import { connect } from 'react-redux';
import { selectCondition, nextCity, previousCity } from '../redux';
import CitySelector from '../components/selectors/city';
import ConditionSelector from '../components/selectors/condition';

const mapDispatch = { selectCondition, nextCity, previousCity };

const Gallery = (props) => {
  console.log({ props });

  return (
    <div className="gallery">
      <ConditionSelector
        conditions={props.conditions}
        handleConditionSelect={props.selectCondition}
      />
      <CitySelector
        city={props.cities.city}
        citiesIndex={props.cities.citiesIndex}
        next={props.nextCity}
        previous={props.previousCity}
      />
    </div>
  );
};

const mapState = (state) => ({
  cities: state.cities,
  conditions: state.conditions,
  app: state.application,
});

export default connect(mapState, mapDispatch)(Gallery);
