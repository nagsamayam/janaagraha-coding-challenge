import './Button.scss';
import React from 'react';

type Props = {
  children: React.ReactNode;
  type: 'button' | 'reset' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function Button({ children, ...rest }: Props) {
  return (
    <button {...rest} className='button'>
      {children}
    </button>
  );
}
