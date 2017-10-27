import React from 'react';
import './slot.css';

const Slot = (props) => {
  return (
    <div
      className={
        props.value === "" ? "game-piece" : "game-piece " + props.value
      }
      onClick={props.onClick}
    />
  );
}

export default Slot;