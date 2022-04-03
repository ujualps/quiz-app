import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import logo from "./logo.svg";
import "./App.css";

const QuestionContainer = ({
  question,
  setNextQuestion,
  currentQuestion,
  total,
  timeLeft,
  addCorrectAnswer,
  addWrongAnser,
}) => {
  const [selected, setSelected] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const expiryTime = moment().add(30, "seconds");
    const interval = setInterval(() => {
      const timeRemaining = moment.duration(expiryTime - moment.now());
      timerRef.current.innerHTML = `Time left: ${timeRemaining.seconds()}`;
    }, 1000);
    const timeOut = setTimeout(() => {
      setNextQuestion();
    }, 30000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeOut);
    };
  }, [question]);

  const btnAction = (e) => {
    setSelected(e.target.value);

    if (question.answer === e.target.value) addCorrectAnswer();
    else addWrongAnser();

    setTimeout(() => {
      setNextQuestion();
      setSelected(null);
    }, 2000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{`Question ${currentQuestion + 1}/${total}`}</span>
        <span ref={timerRef}>{`Time left: ${timeLeft}`}</span>
      </div>
      <h2>{question.question}</h2>
      {question.options.map((option) => (
        <button
          style={{
            backgroundColor: selected
              ? option === question.answer
                ? "green"
                : option === selected
                ? "red"
                : null
              : null,
          }}
          value={option}
          onClick={(e) => btnAction(e)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  // const [timeRemaining, setTimeRemaining] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  let expiryTime;

  const questions = [
    {
      question: "What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "2What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "3What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "4What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "5What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "6What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "7What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "8What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
    {
      question: "9What is your name?",
      options: ["real", "fake1", "fake2", "fake3"],
      answer: "real",
    },
  ];

  const addCorrectAnswer = () => {
    setCorrectAnswer(correctAnswer + 1);
  };

  const addWrongAnser = () => {
    setWrongAnswer(wrongAnswer + 1);
  };

  const setNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const total = 5;
  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>Quiz App</h1>
      {total > currentQuestion ? (
        <QuestionContainer
          question={questions[currentQuestion ?? 1] ?? questions[0]}
          setNextQuestion={setNextQuestion}
          currentQuestion={currentQuestion}
          total={total}
          timeLeft={timeLeft}
          addCorrectAnswer={addCorrectAnswer}
          addWrongAnser={addWrongAnser}
        />
      ) : (
        <>
          <h3>{`Right answers: ${correctAnswer}`}</h3>
          <h3>{`Wrong answers: ${wrongAnswer}`}</h3>
          <h3>{`Unattended: ${total - (correctAnswer + wrongAnswer)}`}</h3>
        </>
      )}
    </div>
  );
}

export default App;
