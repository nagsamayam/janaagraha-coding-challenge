import './Section.scss';

import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Section({ children }: Props) {
  return <section className='section'>{children}</section>;
}
