"use client";
import React from 'react';

interface ButtonProps {
  text: string;
  styleButton?: string;
  styleText?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button 
      className={props.styleButton} 
      onClick={props.onClick}
    >
      <h1 className={props.styleText}>
        {props.text}
      </h1>
    </button>
  );
};

export default Button;