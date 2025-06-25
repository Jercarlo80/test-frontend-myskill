"use client";
import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder?: string;
  styleInputField?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  styleInputField = '',
  value,
  onChange,
  name,
  id,
  disabled = false,
  required = false,
  autoFocus = false
}) => {
  return (
    <input
      className={styleInputField}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
    />
  );
};

export default InputField;
