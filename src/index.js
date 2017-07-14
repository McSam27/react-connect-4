import React, { Component } from 'react'; // gain access to entire react
import ReactDOM from 'react-dom'; // to gain access to react-dom
import Modal from 'react-modal';
import './index.css' // custom styling


class Scoreboard extends Component {
  render() {
    return (
      <div className={this.props.next !== this.props.player ? 'scoreboard' : 'scoreboard ' + this.props.next}>
        Player: {this.props.player}
        <br />
        Wins: <span className="wins">{this.props.wins}</span>
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
} // Board class



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};



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
      history: [{ board: emptyBoard }],
      players: [
        {
          color: 'red',
          wins: 0
        },
        {
          color: 'yellow',
          wins: 0
        }
      ],
      whoIsNext: 'red',
      stepNumber: 0,
      message: ''
    };

    this.undo = this.undo.bind(this);
    this.reset = this.reset.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      isModalOpen: true
    });
  }


  closeModal() {
    this.setState({
      message: '',
      isModalOpen: false
    });
  }

  handleClick(col) {
    const h = JSON.parse(JSON.stringify(this.state.history)); // gets copy of history
    const current = h[h.length - 1];  // gets current board object
    let board = current.board.slice(0); // gets current board
    let cell = -1;

    // find next available index
    board[col].forEach((val, index) => {
      if (val === '') {
        cell = index;
        return;
      }
    });

    // if positive then perform move
    // else log illegal
    if (cell > -1) {

      // set new slot
      board[col][cell] = this.state.whoIsNext;

      // check if winner
      if (checkWin(board)) {
        let emptyBoard = [
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
        ];
        let winner = this.state.whoIsNext === "red" ? "red" : "yellow";
        this.setState((prevState) => ({
          history: [
            {
              board: emptyBoard
            }
          ],
          players: [
            {
              color: "red",
              wins: (winner === 'red' ? prevState.players[0].wins + 1
                : prevState.players[0].wins)
            },
            {
              color: "yellow",
              wins: (winner === 'yellow' ? prevState.players[1].wins + 1
                : prevState.players[1].wins)
            }
          ],
          stepNumber: 0,
          whoIsNext: this.state.whoIsNext === "red" ? "yellow" : "red",
          message: winner + ' wins!',
        }), this.openModal);
      } else { // if no winner, but legal move
        this.setState((prevState => ({
          history: prevState.history.concat({ board }),
          stepNumber: prevState.stepNumber + 1,
          whoIsNext: prevState.whoIsNext === "red" ? "yellow" : "red"
        })));
      };

      // if cell > -1
    } else { // illegal move (col is full)
      this.setState({
        message: 'Sorry, but you cannot go there.'
      }, this.openModal);
    }
  } // handleClick(col)


  undo() {
    let newH;
    this.setState(prevState => {
      if (this.state.stepNumber === 0) {
        alert('no moves to undo!');
        return;
      }
      else {
        newH = JSON.parse(JSON.stringify(
          this.state.history.slice(0, this.state.history.length - 1))
        );
      }

      return {
        history: newH,
        stepNumber: prevState.stepNumber - 1,
        whoIsNext: prevState.whoIsNext === "red" ? "yellow" : "red",
      }
    });
  }

  reset() {
    let emptyBoard = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ];
    this.setState({
      history: [{ board: emptyBoard }],
      whoIsNext: 'red',
      stepNumber: 0,
      winner: ''
    });
  }

  render() {
    const current = this.state.history[this.state.stepNumber];

    let messageModal =
      <Modal
        isOpen={this.state.isModalOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Information modal"
      >
        <div className="message-modal">
          <span>{this.state.message}</span>
          <br />
          <button onClick={this.closeModal}>Close</button>
        </div>
      </Modal>;

    return (
      <div className="App">
        <div className="header">
          <div className="col-4">
            <Scoreboard next={this.state.whoIsNext} player={this.state.players[0].color} wins={this.state.players[0].wins} />
          </div>
          <div className="col-4">
            <h1>Connect Four</h1>
          </div>
          <div className="col-4">
          <Scoreboard next={this.state.whoIsNext} player={this.state.players[1].color} wins={this.state.players[1].wins} />
          </div>
        </div> {/* header */}
        <div className="clearfix"></div>
        {/* <div className="next-piece"></div> */}

        <div className="game-board">
          <Board
            board={current.board}
            onClick={(i) => this.handleClick(i)}
          />
          <div className="reset-button" onClick={this.reset}></div>
          <div className="undo-button" onClick={this.undo}>Undo</div>

          {messageModal}

          {/* <button onClick={this.openModal}>Open Modal</button> */}
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
    midpoint = Math.floor(board.length / 2),
    end_col = board.length - 1,
    end_row = board[0].length - 1;


  // diagonal north-east
  for (var c = beginning; c <= midpoint; c++) {
    for (var r = end_row; r >= midpoint; r--) {
      if (
        board[c][r] !== "" &&
        board[c][r] === board[c + 1][r - 1] &&
        board[c][r] === board[c + 2][r - 2] &&
        board[c][r] === board[c + 3][r - 3]) {
        return true;
      }
    }
  }

  // diagonal north-west
  for (c = end_col; c >= midpoint; c--) {
    for (r = end_row; r >= midpoint; r--) {
      if (
        board[c][r] !== "" &&
        board[c][r] === board[c - 1][r - 1] &&
        board[c][r] === board[c - 2][r - 2] &&
        board[c][r] === board[c - 3][r - 3]) {
        return true;
      }
    }
  }

  // vertical
  for (c = beginning; c <= end_col; c++) {
    for (r = end_row; r >= midpoint; r--) {
      if (board[c][r] !== "" &&
        board[c][r] === board[c][r - 1] &&
        board[c][r] === board[c][r - 2] &&
        board[c][r] === board[c][r - 3]) {
        return true;
      }
    }
  }

  // horizontal
  for (c = beginning; c <= midpoint; c++) {
    for (r = end_row; r >= beginning; r--) {
      if (board[c][r] !== "" &&
        board[c][r] === board[c + 1][r] &&
        board[c][r] === board[c + 2][r] &&
        board[c][r] === board[c + 3][r]) {
        return true;
      }
    }
  }

  // if no winner
  return false;
}