import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { useState } from 'react';

function setActivePlayer(gameTurns) {
    let currPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currPlayer = 'O';
    }

    return currPlayer;
}

function App() {
    //const [ activePlayer, setActivePlayer ] = useState('X');
    const [ gameTurns, setGameTurns] = useState([]);

    const activePlayer = setActivePlayer(gameTurns);

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

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player"> 
                    <Player name="Player 1" symbol="X" isActive = {activePlayer==='X'}/>
                    <Player name="Player 2" symbol="O" isActive = {activePlayer==='O'}/>
                </ol>
                <GameBoard onSelectSquare = {handleSelectedSquare} turns = {gameTurns}/>
            </div>
            <Log turns = {gameTurns}/>
        </main>
    )
}

export default App
