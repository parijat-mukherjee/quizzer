export default function Progress({
  index,
  totalQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={totalQuestions} value={index + Number(answer !== null)} />

      <p>
        <strong>
          {index + 1}/{totalQuestions}
        </strong>
      </p>

      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}
