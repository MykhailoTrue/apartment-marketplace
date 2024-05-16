import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  useDefaultStyle?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  useDefaultStyle = true,
  ...props
}) => {
  let className =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer' +
    (props.disabled ? ' opacity-50 cursor-not-allowed' : '');
  if (props.className) {
    if (useDefaultStyle) {
      className = twMerge(className, props.className);
    } else {
      className = props.className;
    }
  }
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
