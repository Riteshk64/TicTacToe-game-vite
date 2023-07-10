const StatusMessage = ({ isXNext, winner, squares }) => {
  const noMovesLeft = squares.every(squareValue => squareValue !== null);
  const nextPlayer = isXNext ? 'X' : 'O';

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      );
    }

    if (!winner && noMovesLeft) {
      return (
        <>
          <span className="text-orange">0</span> and{' '}
          <span className="text-green">X</span> Tied!
        </>
      );
    }

    return (
      <>
        Next player is{' '}
        <span className={isXNext ? 'text-green' : 'text-orange'}>
          {nextPlayer}
        </span>
      </>
    );
  };
  return <h2 className="status-message">{renderStatusMessage()}</h2>;
};

export default StatusMessage;
