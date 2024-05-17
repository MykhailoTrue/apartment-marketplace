import { FC, useEffect, useState } from 'react';
import classes from './Select.module.css';
import { SelectOption } from '../../../types/SelectOption';

interface SelectProps {
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption) => void;
}

const Select: FC<SelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const optionsClasses = [classes.options];
  if (isOpen) {
    optionsClasses.push(classes.open);
  }

  const changeOption = (option: SelectOption) => {
    if (option !== value) {
      onChange(option);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={classes.container}
    >
      <div className={classes.value}>{value.label}</div>
      <div className={classes.caret}></div>
      <ul className={optionsClasses.join(' ')}>
        {options.map((option, index) => (
          <li
            key={option.value}
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={() => changeOption(option)}
            className={`${classes.option} 
                        ${
                          index === highlightedIndex ? classes.highlighted : ''
                        } 
                        ${option === value ? classes.selected : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
