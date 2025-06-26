interface ButtonProps {
  text: string;
  styleButton: string;
  styleText: string;
  onClick: () => void;
  disabled?: boolean; 
}

export default function Button({ 
  text, 
  styleButton, 
  styleText, 
  onClick, 
  disabled = false 
}: ButtonProps) {
  return (
    <button
      className={styleButton}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styleText}>{text}</span>
    </button>
  );
}