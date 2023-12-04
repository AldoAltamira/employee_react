import {FC} from 'react';

export interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  id?: string;
  name?: string;
  required?: boolean;
  label: string;
}

export const Input:FC<InputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  type,
  id,
  name,
  required,
  label,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        required={required}
      />
    </>
  );
};