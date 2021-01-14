import React from 'react';

export default (props) => {
  const { city, citiesIndex, next, previous } = props;

  return (
    <div className="CitySelector">
      <button type="button"
        onClick={() => previous()}
      >previous
      </button>
      <div className="city-selected">
        <p className="name">{ city }</p>
        <div className="position">{ citiesIndex + 1 } / 7</div>
      </div>
      <button type="button"
        onClick={() => next()}
      >next
      </button>
    </div>
  )
}
