import { useState } from 'react';
import './components/styles.scss';
import Board from './components/Board.jsx';
import { calculateWinner } from './components/winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const traversing = currentMove + 1 !== currentHistory.length;
      const lastGamingState = traversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextGamingState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );

      const base = traversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextGamingState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        className={`btn-reset ${winner ? 'active' : ''}`}
        onClick={() => {
          setHistory(NEW_GAME);
          setCurrentMove(0);
        }}
      >
        {winner ? 'Start new game' : 'Reset board'}
      </button>
      <h3>Current game history</h3>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}
export default App;
