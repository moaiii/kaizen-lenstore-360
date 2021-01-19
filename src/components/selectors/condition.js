import React, { useState, useRef, useEffect } from 'react';

export default (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();

  const {
    handleConditionSelect,
    conditions: { CONDITIONS, condition, conditionsIndex },
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
        // onMouseOver={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {condition}
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
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
