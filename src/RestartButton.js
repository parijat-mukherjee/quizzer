export default function RestartButton({ dispatch }) {
  return (
    <button className="btn btn-ui" onClick={dispatch({ type: "quizActive" })}>
      Restart
    </button>
  );
}
