import { FC } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: FC<InputProps> = (props) => {
  return (
    <label>
      <span>{props.label}</span>
      <input
        {...props}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </label>
  );
};

export default Input;
