/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';

export default (props) => {
  const [isMobile, setIsMobile] = useState();
  const { vrIsOn, setVrIsOn } = props;

  const vrIsOnClassMod = vrIsOn ? '--isVr' : '';

  useEffect(() => {
    window.mobileCheck = function () {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a,
          )
        ) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
    setIsMobile(window.mobileCheck);
  }, []);

  if (isMobile) {
    return (
      <div className="VrSelector">
        <p>Vr View</p>
        <div className="toggle" onClick={() => setVrIsOn()}>
          <TiTick style={{ margin: '0 0 0 0.3rem' }} />
          <div className={`switch ${vrIsOnClassMod}`} />
        </div>
      </div>
    );
  }

  return null;
};
