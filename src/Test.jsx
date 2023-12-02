import React, { useState, useEffect } from "react";
import "./App.css";
import MCQ from "./MCQ";

const Test = ({ data }) => {
  const [mcqs, setMcqs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const questions = data.mcq.map((mcq) => ({
      ...mcq,
      selectedAnswer: [],
    }));
    setMcqs(questions);
  }, []);

  useEffect(() => {
    if (submitted) {
      mcqs.map((mcq) => {
        if (mcq.selectedAnswer === mcq.answer) {
          setScore(score + 1);
        }
      });
    }
  }, [submitted]);

  const selectAnswer = (value) => {
    const questions = [...mcqs];
    if (questions[currentIndex].selectedAnswer.includes(value)) {
      questions[currentIndex].selectedAnswer = questions[
        currentIndex
      ].selectedAnswer.filter((answer) => answer !== value);
    } else {
      questions[currentIndex].selectedAnswer.push(value);
    }
    setMcqs(questions);
  };

  return (
    mcqs.length > 0 && (
      <div>
        <MCQ
          mcq={mcqs[currentIndex]}
          selectAnswer={selectAnswer}
          submitted={submitted}
        />
        <div className="buttons">
          {currentIndex > 0 && (
            <div
              className="App-link"
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              Back
            </div>
          )}
          {!submitted && (
            <div className="App-link red" onClick={() => selectAnswer(null)}>
              Clear answer
            </div>
          )}
          {currentIndex < mcqs.length - 1 && (
            <div
              className="App-link"
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              Next
            </div>
          )}
          {currentIndex === mcqs.length - 1 && (
            <div className="App-link green" onClick={() => setSubmitted(true)}>
              {submitted ? "Submitted" : "Submit"}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Test;
