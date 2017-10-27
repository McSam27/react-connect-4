import React, { Component } from 'react';
import Slot from '../slot';

class Board extends Component {
  renderSlot(i, k) {
    return (
      <Slot
        value={this.props.board[i][k]}
        onClick={() => this.props.onClick(i, k)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="game-col">
          {this.renderSlot(0, 0)}
          {this.renderSlot(0, 1)}
          {this.renderSlot(0, 2)}
          {this.renderSlot(0, 3)}
          {this.renderSlot(0, 4)}
          {this.renderSlot(0, 5)}
        </div>
        <div className="game-col">
          {this.renderSlot(1, 0)}
          {this.renderSlot(1, 1)}
          {this.renderSlot(1, 2)}
          {this.renderSlot(1, 3)}
          {this.renderSlot(1, 4)}
          {this.renderSlot(1, 5)}
        </div>
        <div className="game-col">
          {this.renderSlot(2, 0)}
          {this.renderSlot(2, 1)}
          {this.renderSlot(2, 2)}
          {this.renderSlot(2, 3)}
          {this.renderSlot(2, 4)}
          {this.renderSlot(2, 5)}
        </div>
        <div className="game-col">
          {this.renderSlot(3, 0)}
          {this.renderSlot(3, 1)}
          {this.renderSlot(3, 2)}
          {this.renderSlot(3, 3)}
          {this.renderSlot(3, 4)}
          {this.renderSlot(3, 5)}
        </div>
        <div className="game-col">
          {this.renderSlot(4, 0)}
          {this.renderSlot(4, 1)}
          {this.renderSlot(4, 2)}
          {this.renderSlot(4, 3)}
          {this.renderSlot(4, 4)}
          {this.renderSlot(4, 5)}
        </div>
        <div className="game-col">
          {this.renderSlot(5, 0)}
          {this.renderSlot(5, 1)}
          {this.renderSlot(5, 2)}
          {this.renderSlot(5, 3)}
          {this.renderSlot(5, 4)}
          {this.renderSlot(5, 5)}
        </div>
        <div className="game-col">
          {this.renderSlot(6, 0)}
          {this.renderSlot(6, 1)}
          {this.renderSlot(6, 2)}
          {this.renderSlot(6, 3)}
          {this.renderSlot(6, 4)}
          {this.renderSlot(6, 5)}
        </div>
      </div>
    );
  }
}


export default Board;
