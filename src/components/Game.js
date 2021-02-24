import React, { Component } from 'react'
import Board from './Board'

export default class Game extends Component {
     constructor(props) {
          super(props)
     
          this.state = {
               xIsNext: true,
               stepNum: 0,
               history: [
                    { squares: Array(9).fill(null) }
               ]
          }
     }

     calculateWinner(squares){
          const lines = [
               [0, 1, 2],
               [3, 4, 5],
               [6, 7, 8],
               [0, 3, 6],
               [1, 4, 7],
               [2, 5, 8],
               [0, 4, 8],
               [2, 4, 6]
          ];
     
          for(let i = 0; i < lines.length; i++){
               let [a, b, c] = lines[i];
     
               if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                    console.log(squares[a]);
                    return squares[a];
               }
          }
     
          return null;
     }

     jumpTo(step) {
          this.setState({
               stepNum: step,
               xIsNext: (step % 2) === 0
          });
     }

     handleClick = (i) => {
          const history = this.state.history.slice(0, this.state.stepNum + 1);
          const current = history[history.length - 1];
          const squares = current.squares.slice();
          const winner = this.calculateWinner(squares);

          if(winner || squares[i]){
               return;
          }

          squares[i] = this.state.xIsNext ? 'X' : 'O';

          this.setState({
               history: history.concat({
                    squares: squares
               }),
               xIsNext: !this.state.xIsNext,
               stepNum: history.length
          });
     }
     
     render() {
          const history = this.state.history;
          const current = history[this.state.stepNum];
          const winner = this.calculateWinner(current.squares);
          const moves = history.map((step, move) => {
               const desc = move ? 'Go To #' + move : 'Start the Game';

               return (
                    <li key = {move}>
                         <button className="button" onClick={() => this.jumpTo(move)}>
                              {desc}
                         </button>
                    </li>
               )
          });

          let status;
          if(this.state.stepNum > 8){
               status = "It's a tie."
          }
          else if(winner){
               status = 'Winner is ' + winner;
          }
          else{
               status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
          }

          return (
               <div className="game">
                    <div className="game-board">
                         <Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
                    </div>
                    <div className='game-info'>
                         <div className='status'>{status}</div>
                         <ul>{moves}</ul>
                    </div>
               </div>
          )
     }
}