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
      question: "If we want define style for an unique element, then which css selector will we use ?",
      options: ["id", "text", "class", "name"],
      answer: "id",
    },
    {
      question: "If we don't want to allow a floating div to the left side of an element, which css property will we use ?",
      options: ["margin", "clear", "float", "padding"],
      answer: "clear",
    },
    {
      question: "Suppose we want to arragnge five nos. of DIVs so that DIV4 is placed above DIV1. Now, which css property will we use to control the order of stack?",
      options: ["d-index", "s-index", "x-index", "z-index"],
      answer: "z-index",
    },
    {
      question: "If we want to wrap a block of text around an image, which css property will we use ?",
      options: ["wrap", "push", "float", "align"],
      answer: "float",
    },
    {
      question: "If we want to show an Arrow as cursor, then which value we will use ?",
      options: ["pointer", "default", "arrow", "arr"],
      answer: "default",
    },
    {
      question: "If we want to use a nice looking green dotted border around an image, which css property will we use?",
      options: ["border-color", "border-decoration", "border-style", "border-line"],
      answer: "border-style",
    },
    {
      question: "Which of the following properties will we use to display border around a cell without any content ?",
      options: ["empty-cell", "blank-cell", "noncontent-cell", "void-cell"],
      answer: "empty-cell",
    }
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

  const total = questions.length;
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
