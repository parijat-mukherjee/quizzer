export default function NextButton({
  dispatch,
  answer,
  index,
  totalQuestions,
}) {
  if (answer === null) return null;
  let end = false;
  if (index === totalQuestions - 1) {
    end = true;
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        end ? dispatch({ type: "finish" }) : dispatch({ type: "next" })
      }
    >
      {end ? "Finish" : "Next"}
    </button>
  );
}
