import React from 'react';

type Props = {
  id: string;
  label: string;
  children: React.ReactNode;
};

export default function FormControl({ id, label, children }: Props) {
  return (
    <div className='form-control'>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}
