import React, { useState, useRef, useEffect } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { FaHandPointLeft } from 'react-icons/fa';

export default (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();

  const {
    handleConditionSelect,
    copy,
    lang,
    conditions: { CONDITIONS, condition },
    setHasBeenClickedOnce,
  } = props;

  const isOpenClassMod = isOpen ? '--isOpen' : '';

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div
      className={`ConditionSelector ${isOpenClassMod}`}
      id="condition-selector"
      ref={node}
    >
      <div
        className={`selected ${isOpenClassMod}`}
        onClick={() => {
          setHasBeenClickedOnce(true);
          setIsOpen(!isOpen);
        }}
      >
        {copy.condition[lang][condition].name}
        {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </div>
      <ul className={`dropdown ${isOpenClassMod}`}>
        {CONDITIONS.map((el) => {
          return (
            <li
              onClick={() => {
                setIsOpen(false);
                handleConditionSelect(el);
              }}
              key={el}
              className="condition-item"
            >
              {copy.condition[lang][el].name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
