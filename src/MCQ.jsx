import React from "react";

const MCQ = ({ mcq, selectAnswer, submitted }) => {
  const { hasMultipleAnswer } = mcq;
  const markAnswer = (value) => {
    if (!submitted) selectAnswer(value);
  };

  const submittedClass = (isSubmitted, option) => {
    if (isSubmitted) {
      if (mcq.selectedAnswer.includes(option) && !mcq.answer.includes(option)) {
        return " incorrect";
      } else if (mcq.answer.includes(option)) {
        return " correct";
      } else {
        return "";
      }
    } else {
      return " option-hover";
    }
  };
  return (
    <div className="card">
      <h3>{mcq.question}</h3>
      <div className="options">
        {mcq.options.map((option, index) => (
          <div
            className={"option" + submittedClass(submitted, option)}
            onClick={() => markAnswer(option)}
          >
            <input
              type={hasMultipleAnswer ? "checkbox" : "radio"}
              name={"option" + index}
              value={option}
              checked={mcq.selectedAnswer.includes(option)}
            />
            <label for={"option" + index}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQ;
