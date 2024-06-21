import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import { useState } from 'react';

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function setActivePlayer(gameTurns) {
    let currPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currPlayer = 'O';
    }

    return currPlayer;
}

function deriveWinner(gameBoard, player){
    let winner;

    for(const combination of WINNING_COMBINATIONS){
        const firstSqSym = gameBoard[combination[0].row][combination[0].column];
        const secondSqSym = gameBoard[combination[1].row][combination[1].column];
        const thirdSqSym = gameBoard[combination[2].row][combination[2].column];

        if( firstSqSym && firstSqSym === secondSqSym && firstSqSym === thirdSqSym ){
            winner = player[firstSqSym];
        }
    }

    return winner;
}

function deriveGameBoard(gameTurns){
    let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];

    for(const turn of gameTurns){
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {
    //const [ activePlayer, setActivePlayer ] = useState('X');
    const [player, setPlayer] = useState(PLAYERS);
    const [ gameTurns, setGameTurns] = useState([]);
    const activePlayer = setActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, player);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectedSquare(rowIndex, colIndex){
        //setActivePlayer((currPlayer) => currPlayer === 'X' ? 'O' : 'X');
        setGameTurns((prevState) => {
            const currPlayer = setActivePlayer(prevState);

            const updatedTurns = [
                {square: {row: rowIndex, col: colIndex}, player: currPlayer},
                ...prevState
            ]
            return updatedTurns;
        });
    }

    function handlePlayer(symbol, newName){
        setPlayer(prevPlayer => {
            return{
                ...prevPlayer,
                [symbol]: newName
            }
        })
    }

    function handleRematch(){
        setGameTurns([]);
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player"> 
                    <Player name={PLAYERS.X} symbol="X" isActive = {activePlayer==='X'} onChangeName = {handlePlayer} />
                    <Player name={PLAYERS.O} symbol="O" isActive = {activePlayer==='O'} onChangeName = {handlePlayer} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart = {handleRematch} />}
                <GameBoard onSelectSquare = {handleSelectedSquare} board = {gameBoard}/>
            </div>
            <Log turns = {gameTurns}/>
        </main>
    )
}

export default App
