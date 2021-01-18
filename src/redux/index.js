import { createSlice } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';

const initialCityState = {
  CITIES: [
    'dubai',
    'new york',
    'sydney',
    'paris',
    'venice',
    'london',
    'hong kong',
  ],
  selectedCity: 0,
  previousCity: 6,
  nextCity: 1,
  city: 'dubai',
};

const cities = createSlice({
  name: 'cities',
  initialState: initialCityState,

  reducers: {
    nextCity(state) {
      const index = state.selectedCity + 1;
      const indexCap = state.CITIES.length;

      state.selectedCity = index >= indexCap ? 0 : index;
      state.previousCity = index - 1 < 0 ? indexCap - 1 : index - 1;
      if (state.selectedCity === 0) {
        state.nextCity = 1;
      } else {
        state.nextCity = index + 1 >= indexCap ? 0 : state.selectedCity + 1;
      }
    },

    previousCity(state) {
      const index = state.selectedCity - 1;
      const indexCap = state.CITIES.length - 1;
      const indexBase = 0;

      state.selectedCity = index < indexBase ? indexCap : index;

      state.nextCity =
        state.selectedCity + 1 > indexCap ? 0 : state.selectedCity + 1;

      if (state.selectedCity === 0) {
        state.previousCity = indexCap;
      } else {
        state.previousCity =
          state.selectedCity - 1 < 0 ? indexCap : state.selectedCity - 1;
      }
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
    'retinitis pigmentosa',
    'night blindness',
  ],
  conditionsIndex: 0,
  condition: 'normal',
};

const conditions = createSlice({
  name: 'conditions',
  initialState: initialConditionState,
  reducers: {
    selectCondition(state, action) {
      const selectedState = action.payload;
      const conditionIndex = state.CONDITIONS.indexOf(selectedState);
      if (state.conditionsIndex !== -1) {
        state.condition = state.CONDITIONS[conditionIndex];
      } else {
        state.condition = state.CONDITIONS[0];
      }
    },
  },
});

export const { selectCondition } = conditions.actions;

const initialApplicationState = {
  vrIsOn: true,
  infoIsVisible: true,
  isMobile: window.innerWidth < 550 || window.innerHeight < 550,
};

const application = createSlice({
  name: 'application',
  initialState: initialApplicationState,
  reducers: {
    setVrIsOn(state) {
      state.vrIsOn = !state.vrIsOn;
    },
    setInfoIsVisible(state) {
      state.infoIsVisible = !state.infoIsVisible;
    },
  },
});

export const { setVrIsOn, setInfoIsVisible } = application.actions;

const reducer = combineReducers({
  cities: cities.reducer,
  conditions: conditions.reducer,
  application: application.reducer,
});

export default createStore(reducer);
