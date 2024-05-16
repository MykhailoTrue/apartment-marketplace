import { FC } from 'react';

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, value, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="h-5 w-5 text-indigo-600 "
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default Checkbox;
