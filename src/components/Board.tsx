import React, {useState} from 'react';
import Square from './Square';

interface BoardProps {

}

type Squares = Array<string | null>;

const Board = (props: BoardProps) => {
    const [squares, setSquares] = useState<Squares>(Array(9).fill(''));
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    function handleClick(checkedBy: string, index: number): void {
        if (squares[index]) return;
        if (calculateWinner(squares)) return;

        const newSquares: Squares = squares.slice();
        newSquares[index] = checkedBy;
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    function renderSquare(index: number): JSX.Element {
        return (
            <Square
                value={squares[index]}
                onClick={() => handleClick(xIsNext ? 'X' : 'O', index)}
            />
        )
    }

    function calculateWinner(squares: Squares): string | null {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const winner: string | null = calculateWinner(squares);

    let status: string = '';
    if (winner) {
        status = 'Winner is ';
    } else {
        status = 'Next Player is ';
    }

    return (
        <div>
            <div>{status}: {xIsNext ? 'X' : 'O'}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>)
}

export default Board;