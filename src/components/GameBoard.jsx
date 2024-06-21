export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowId) => <li key={rowId}>
                <ol>
                    {row.map((col, colId) => <li key={colId}>
                        <button onClick={() => onSelectSquare(rowId, colId)} disabled = {col !== null}>{col}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}
