import React from 'react';
import './Button.css';

export default function Button(props) {
    const {content = "Text", onClick= () => {}, extraClasses = ""} = props;

  return (
    <button className={'container-btn ' + extraClasses} onClick={onClick}>
        {content}
    </button>
  );
}
