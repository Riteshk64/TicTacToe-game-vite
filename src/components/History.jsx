const History = ({ history, moveTo, currentMove }) => {
  return (
    <div className="history-wrapper">
      <ul className="history">
        {history.map((_, idx) => (
          <li key={idx}>
            <button
              type="button"
              className={`btn-move ${currentMove === idx ? 'active' : ''}`}
              onClick={() => moveTo(idx)}
            >
              {idx === 0 ? 'Go to game start' : `Go to move #${idx}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
