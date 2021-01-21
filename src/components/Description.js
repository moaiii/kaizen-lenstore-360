import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default (props) => {
  const node = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [conditionsViewed, setConditionsViewed] = useState([]);
  const { copy, lang, condition, infoIsVisible } = props;

  const handleShowDescription = () => {
    if (conditionsViewed.includes(condition)) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      setConditionsViewed([...conditionsViewed, condition]);
    }
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) return;
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    handleShowDescription();
  }, [condition]);

  const isVisibleClassMod =
    !isVisible || condition === 'normal' ? '--hide' : '';

  return (
    <div className={`Description ${isVisibleClassMod} `} ref={node}>
      <div
        className={`close-button ${isVisibleClassMod}`}
        onClick={() => {
          setIsVisible(false);
        }}
      >
        <AiOutlineCloseCircle />
      </div>
      <div className="inner-container">
        <h4>{copy.condition[lang][condition].name}</h4>
        <p>{copy.condition[lang][condition].description}</p>
      </div>
    </div>
  );
};
