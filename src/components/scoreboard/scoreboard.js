import React from 'react';
import './scoreboard.css';

const Scoreboard = (props) => {
  const {
    next,
    player,
    wins
  } = props;
  return (
    <div
      className={
        next !== player
          ? "scoreboard"
          : "scoreboard " + next
      }
    >
      Player: {player}
      <br />
      Wins: <span className="wins">{wins}</span>
    </div>
  );
}

export default Scoreboard;
