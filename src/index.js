import React, { Component } from 'react'; // gain access to entire react
import ReactDOM from 'react-dom'; // to gain access to react-dom
import './index.css' // custom styling

class Scoreboard extends Component {
  render() {
    return (
    <div className={this.props.next !== this.props.player ? 'scoreboard' : 'scoreboard ' + this.props.next}>
        <span>Player: {this.props.player}</span>
        <br/>
        <span>Wins: {this.props.wins}</span>
      </div>
    );
  }
}

function Slot(props) {
  return (
    <button
      className={props.value === '' ? 'game-piece' : 'game-piece ' + props.value}
      onClick={props.onClick}>
    </button>
  );
}


// board class
class Board extends React.Component {
  renderSlot(i, k) {
    return (
      <Slot
        value={this.props.boards[i][k]}
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
} // Board class

// game 
class Game extends React.Component {
  constructor() {
    super();
    let emptyBoard = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ];
    this.state = {
      history: [
        {
          boards: emptyBoard
        }
      ],
      players: [
        {
          color: "red",
          wins: 0
        },
        {
          color: "yellow",
          wins: 0
        }
      ],
      whoIsNext: "red",
      stepNumber: 0,
      winner: ''
    };
  }

  handleClick(col) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const newBoard = current.boards.slice();
    let cell = -1;

    // find next available index
    newBoard[col].forEach((val, index) => {
      if (val === '') {
        cell = index;
        return;
      }
    });

    // if positive then perform move
    // else log illegal
    if (cell > -1) {
      // set new slot
      newBoard[col][cell] = this.state.whoIsNext;
      // check if winner
      if (checkWin(newBoard)) {
      let winner = this.state.whoIsNext === "red" ? "red" : "yellow";
        this.setState({
          history: history.concat([
            {
              boards: newBoard
            }
          ]),
          players: [
            {
              color: "red",
              wins: 0
            },
            {
              color: "yellow",
              wins: 0
            }
          ],
          stepNumber: history.length,
          whoIsNext: this.state.whoIsNext === "red" ? "yellow" : "red",
          winner: this.state.whoIsNext === "red" ? "red" : "yellow"
        }, 
          () => {
            
            alert(this.state.winner);
          }
        );
      } else {
        this.setState({
          history: history.concat([
            {
              boards: newBoard
            }
          ]),
          stepNumber: history.length,
          whoIsNext: this.state.whoIsNext === "red" ? "yellow" : "red",
        });
      }
    } else {
      console.log("ILLEGAL MOVE");
    }

  }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     whoIsNext: (step % 2) === 0
  //   });
  // }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    // const moves = history.map((step, move) => {
    //   const desc = move ? "Move #" + move : "Game start";
    //   return (
    //     <li key={move}>
    //       <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
    //     </li>
    //   );
    // });

    return (
      <div className="App">
        <div className="header">

          <div className="col-4">
            <Scoreboard next={this.state.whoIsNext} player={this.state.players[0].color} wins={this.state.players[0].wins}/>
            </div>
          <div className="col-4">
            <h1>Connect Four</h1>
          </div>
          <div className="col-4">
            <Scoreboard next={this.state.whoIsNext} player={this.state.players[1].color} wins={this.state.players[1].wins}/>
          </div>

        </div>
        <div className="clearfix"></div>
        <div className="game-board">
          <Board
            boards={current.boards}
            onClick={(i, k) => this.handleClick(i, k)}
          />
          <div className="reset-button" onClick={this.resetBoard}>
            <span></span>
          </div>
          <div className="undo-button" onClick={this.undo}>Undo</div> 
        </div>
      </div>
    );
  }
}






// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// function to calculate if a player has won
function checkWin(board) {
  let beginning = 0,
      midpoint = Math.floor(board.length/2),
      end_col = board.length - 1,
      end_row = board[0].length - 1;


  // diagonal north-east
  for (var c = beginning; c <= midpoint; c++) {
    for(var r = end_row; r >= midpoint; r--) {
      if(
        board[c][r] !== "" &&
        board[c][r] === board[c+1][r-1] &&
        board[c][r] === board[c+2][r-2] &&
        board[c][r] === board[c+3][r-3]   ) {
        return true;
      }
    }
  }
  
  // diagonal north-west
  for (c = end_col; c >= midpoint; c--) {
    for(r = end_row; r >= midpoint; r--) {
      if(
        board[c][r] !== "" &&
        board[c][r] === board[c-1][r-1] &&
        board[c][r] === board[c-2][r-2] &&
        board[c][r] === board[c-3][r-3]   ) {
        return true;
      }
    }
  }

  // vertical
  for (c = beginning; c <= end_col; c++) {
    for(r = end_row; r >= midpoint; r--) {
      if(board[c][r] !== "" &&
        board[c][r] === board[c][r-1] &&
        board[c][r] === board[c][r-2] &&
        board[c][r] === board[c][r-3]) {
          return true;
       }
    }
  }

  // horizontal
  for (c = beginning; c <= midpoint; c++) {
    for(r = end_row; r >= beginning; r--) {
      if(board[c][r] !== "" &&
        board[c][r] === board[c+1][r] &&
        board[c][r] === board[c+2][r] &&
        board[c][r] === board[c+3][r]) {
          return true;
      }    
    }
  }

  // if no winner
  return false;
}