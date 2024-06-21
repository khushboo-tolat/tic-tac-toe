const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard;

    for(const turn of turns){
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelect(rowId, colId) {
    //   setGameBoard((prevGameBoard) => {
    //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //     updatedBoard[rowId][colId] = activePlayerSymbol;
    //     return updatedBoard;
    //   });

    //   onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowId) => <li key={rowId}>
                <ol>
                    {row.map((col, colId) => <li key={colId}>
                        <button onClick={() => onSelectSquare(rowId, colId)}>{col}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}
