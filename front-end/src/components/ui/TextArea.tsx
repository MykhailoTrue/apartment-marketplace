import React, { FC } from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}
const TextArea: FC<TextAreaProps> = (props) => {
  return (
    <label>
      <span>{props.label}</span>
      <textarea
        {...props}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </label>
  );
};

export default TextArea;
