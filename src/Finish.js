export default function Finish({
  points,
  maxPossiblePoints,
  highScore,
  dispatch,
}) {
  const percentageResult = Math.ceil((points / maxPossiblePoints) * 100);
  return (
    <>
      <p className="result">
        You Scored <strong> {points} </strong> points out of{" "}
        <strong> {maxPossiblePoints} </strong>
        <strong>({percentageResult}%)</strong>
      </p>

      <p className="highscore">Highscore: {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
