export default function Ready({ qNum, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{qNum} Questions To Test Your React Mastery!</h3>

      <button className="btn" onClick={() => dispatch({ type: "quizActive" })}>
        Let's Start
      </button>
    </div>
  );
}
