import React, { useState } from 'react';

export default (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleConditionSelect,
    conditions: { CONDITIONS, condition, conditionsIndex },
  } = props;

  const isOpenClassMod = isOpen ? '--isOpen' : '';

  return (
    <div className={`ConditionSelector ${isOpenClassMod}`}>
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
