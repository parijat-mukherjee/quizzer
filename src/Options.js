export default function Options({ question, answer, dispatch }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } ${index === answer ? "answer" : ""} `}
          disabled={answer !== null}
          key={option}
          onClick={() =>
            dispatch({
              type: "answered",
              payload: {
                index: index,
                points: index === question.correctOption ? question.points : 0,
              },
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
