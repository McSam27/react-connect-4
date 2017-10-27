import React, { Component } from "react"; // gain access to entire react
import Modal from "react-modal";
import Scoreboard from './scoreboard';
import Board from './board';
import {checkWin, emptyBoard} from '../utils/gameUtils.js';

import "./app.css"; // custom styling

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      history: [{ board: emptyBoard }],
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
      mouseX: 0,
      stepNumber: 0,
      message: ""
    };

    this.undo = this.undo.bind(this);
    this.reset = this.reset.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  openModal() {
    this.setState({
      isModalOpen: true
    });
  }

  closeModal() {
    this.setState({
      message: "",
      isModalOpen: false
    });
  }

  onMouseMove(e) {
    this.setState({
      mouseX: e.screenX
    });
  }

  /**
   * Handle Click function
   * @description Used to check if there is a tie, winner, illegal or valid move.
   */
  handleClick(col) {
    if (this.state.stepNumber > 41) {
      this.setState(
        prevState => ({
          history: [
            {
              board: emptyBoard
            }
          ],
          players: [
            {
              color: "red",
              wins: prevState.players[0].wins
            },
            {
              color: "yellow",
              wins: prevState.players[1].wins
            }
          ],
          stepNumber: 0,
          whoIsNext: this.state.whoIsNext === "red" ? "yellow" : "red",
          message: "Uh oh! Looks like a tie game!"
        }),
        this.openModal
      );
      return;
    }

    const h = JSON.parse(JSON.stringify(this.state.history)); // gets copy of history
    const current = h[h.length - 1]; // gets current board object
    let board = current.board.slice(0); // gets current board
    let cell = -1;

    // find next available index
    board[col].forEach((val, index) => {
      if (val === "") {
        cell = index;
        return;
      }
    });

    // If greater than -1, then valid move
    if (cell > -1) {
      board[col][cell] = this.state.whoIsNext;

      // check if there is a winner
      if (checkWin(board)) {
        let winner = this.state.whoIsNext === "red" ? "red" : "yellow";
        this.setState(
          prevState => ({
            history: [{board: emptyBoard}],
            players: [
              {
                color: "red",
                wins:
                  winner === "red"
                    ? prevState.players[0].wins + 1
                    : prevState.players[0].wins
              },
              {
                color: "yellow",
                wins:
                  winner === "yellow"
                    ? prevState.players[1].wins + 1
                    : prevState.players[1].wins
              }
            ],
            stepNumber: 0,
            whoIsNext: this.state.whoIsNext === "red" ? "yellow" : "red",
            message: winner + " wins!"
          }),
          this.openModal
        );
        // if no winner, then do the move
      } else {
        this.setState(prevState => ({
          history: prevState.history.concat({ board }),
          stepNumber: prevState.stepNumber + 1,
          whoIsNext: prevState.whoIsNext === "red" ? "yellow" : "red"
        }));
      }

      // invalid move
    } else { 
      this.setState(
        {
          message: "Sorry, but you cannot go there."
        },
        this.openModal
      );
    }
  } // handleClick(col)

  /**
   * Undo function
   * @description Used to undo a move
   */
  undo() {
    let newH;
    this.setState(prevState => {
      if (this.state.stepNumber === 0) {
        return {
          message: "No moves to undo!"
        };
      } else {
        newH = JSON.parse(
          JSON.stringify(
            this.state.history.slice(0, this.state.history.length - 1)
          )
        );
      }

      return {
        history: newH,
        stepNumber: prevState.stepNumber - 1,
        whoIsNext: prevState.whoIsNext === "red" ? "yellow" : "red"
      };
    });
  }

  reset() {
    let emptyBoard = [
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""]
    ];
    this.setState({
      history: [{ board: emptyBoard }],
      whoIsNext: "red",
      stepNumber: 0,
      winner: ""
    });
  }


  render() {
    const {
      history,
      stepNumber,
      isModalOpen,
      message,
      whoIsNext,
      players
    } = this.state;

    const modalStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      }
    };
    
    let messageModal = (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.closeModal}
        style={modalStyles}
        contentLabel="Information modal"
      >
        <div className="message-modal">
          <span>{message}</span>
          <br />
          <button onClick={this.closeModal}>Close</button>
        </div>
      </Modal>
    );

    const current = history[stepNumber];

    let {mouseX} = this.state;
    mouseX -= 35;
    
    const nextPieceClasses = `next-piece ${whoIsNext}`

    return (
      <div className="App">
        <div className="header">
          <div className="col-4">
            <Scoreboard
              next={whoIsNext}
              player={players[0].color}
              wins={players[0].wins}
            />
          </div>
          <div className="col-4 title">Connect Four</div>
          <div className="col-4">
            <Scoreboard
              next={whoIsNext}
              player={players[1].color}
              wins={players[1].wins}
            />
          </div>
        </div>
        <div className="clearfix" />
        <div className="next-piece--holder">
          <div className={nextPieceClasses} style={{left: mouseX}}></div>
        </div>
          <div className="game-board" onMouseMove={this.onMouseMove}>
            <Board board={current.board} onClick={i => this.handleClick(i)} />
            <div className="reset-button" onClick={this.reset}>
              <span />
            </div>
            <div className="undo-button" onClick={this.undo}>
              Undo
            </div>
            {messageModal}
          </div>
      </div>
    );
  }
}

// ========================================
