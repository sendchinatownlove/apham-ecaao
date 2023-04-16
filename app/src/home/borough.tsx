import React from 'react';
import '../App.css';

interface Props {
  borough: String;
}


function BoroughButton(props: Props) {

  return (
    <button>
      {props.borough}
    </button>
  );
}

export default BoroughButton;