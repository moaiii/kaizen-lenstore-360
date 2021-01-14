import { createSlice } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux';

const initialCityState = {
  CITIES: [
    'sydney',
    'new york',
    'london',
    'paris',
    'tokyo',
    'los angeles',
    'madrid'
  ],
  citiesIndex: 0,
  city: 'sydney',
}

const cities = createSlice({
  name: 'cities',
  initialState: initialCityState,

  reducers: {
    nextCity(state) {
      if (state.citiesIndex + 1 === state.CITIES.length) {
        state.citiesIndex = 0
      } else {
        state.citiesIndex = state.citiesIndex + 1;
      }
      state.city = state.CITIES[state.citiesIndex]
    },

    previousCity(state) {
      if (state.citiesIndex === 0) {
        state.citiesIndex = state.CITIES.length - 1
      } else {
        state.citiesIndex = state.citiesIndex - 1;
      }
      state.city = state.CITIES[state.citiesIndex]
    },
  },
});

export const { nextCity, previousCity } = cities.actions;

const initialConditionState = {
  CONDITIONS: [
    'normal',
    'deuteranopia',
    'macular degeneration',
    'cataracts',
    'eye floaters',
    'glaucoma',
    'tunnel vision',
    'night blindness',
    'retinitis pigmentosa'
  ],
  conditionsIndex: 0,
  condition: 'normal',
}

const conditions = createSlice({
  name: 'conditions',
  initialState: initialConditionState,
  reducers: {
    selectCondition(state, action) {
      const selectedState = action.payload;
      const conditionIndex = state.CONDITIONS.indexOf(selectedState);
      if (state.conditionsIndex !== -1) {
        state.condition = state.CONDITIONS[conditionIndex]
      } else {
        state.condition = state.CONDITIONS[0]
      }
    },
  },
});

export const { selectCondition } = conditions.actions;

const initialApplicationState = {
  vrIsOn: false,
  language: 'en'
}

const application = createSlice({
  name: 'application',
  initialState: initialApplicationState,
  reducers: {
    // setVrIsOn(state, action) { },
    // setLanguage(state, action) { }
  }
})

const reducer = combineReducers({
  cities: cities.reducer,
  conditions: conditions.reducer,
  application: application.reducer
})

export default createStore(reducer);
