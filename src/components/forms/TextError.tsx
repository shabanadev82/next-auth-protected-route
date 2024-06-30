import React from 'react';

export interface ErrorProps {
  children?: React.ReactNode;
}

const TextError = (props: ErrorProps) => {
  return <div className='text-rose-900 font-bold text-wrap'>{props.children}</div>;
};

export default TextError;
