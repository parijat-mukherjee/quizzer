import React from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer, useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import Ready from "./Ready";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,

        status: "error",
      };

    case "quizActive":
      return {
        ...state,

        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "answered":
      return {
        ...state,
        answer: action.payload.index,
        points: state.points + action.payload.points,
      };

    case "next":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        highScore: 0,
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("Failed to fetch data.");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    getData();
  }, []);

  const maxPossiblePoints = questions.reduce(function (prev, cur) {
    return prev + cur.points;
  }, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Ready qNum={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              totalQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              totalQuestions={questions.length}
            />
          </>
        )}

        {status === "finish" && (
          <Finish
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
