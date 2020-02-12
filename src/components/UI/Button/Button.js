import React from 'react';
import classes from './Button.css'

const button = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(' ')}
    >{props.children}</button>
  );
};

export default button;
