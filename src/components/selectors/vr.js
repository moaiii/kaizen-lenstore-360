import React from 'react';
import { TiTick } from 'react-icons/ti';

export default (props) => {
  const { vrIsOn, setVrIsOn } = props;

  const vrIsOnClassMod = vrIsOn ? '--isVr' : '';

  return (
    <div className="VrSelector">
      <p>Vr View</p>
      <div className="toggle" onClick={() => setVrIsOn()}>
        <TiTick style={{ margin: '0 0 0 0.3rem' }} />
        <div className={`switch ${vrIsOnClassMod}`} />
      </div>
    </div>
  );
};
