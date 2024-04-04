import React, { useState, useEffect } from 'react';
import Question from './Question'; // Assuming you have already created the Question component

function Quiz({ questions, updateSelected, weekSelected }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedOptions(new Set());
    setShowResult(false);
    setIsCorrect(false);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (optionId) => {
    if (!showResult) {
      const newSelectedOptions = questions[currentQuestionIndex].multicorrect ? new Set(selectedOptions) : new Set();
      if (newSelectedOptions.has(optionId)) {
        newSelectedOptions.delete(optionId);
      } else {
        newSelectedOptions.add(optionId);
      }
      setSelectedOptions(newSelectedOptions);
    }
  };

  const handleSubmit = () => {
    let isCorrect = true;
    questions[currentQuestionIndex].options.forEach(option => {
      if ((selectedOptions.has(option.id) && !option.isCorrect) || (!selectedOptions.has(option.id) && option.isCorrect)) {
        isCorrect = false;
      }
    });
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setTotalScore(totalScore + 1);
    }
    setShowResult(true);
    return isCorrect;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("All questions have been answered.");
    }
  };

  const handleComplete = () => {
    setComplete(true);
  };

  const doReset = () => {
    setCurrentQuestionIndex(0);
    setComplete(false);
    updateSelected(-1);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 text-white font-serif min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Week {weekSelected}</h1>

      {!complete && (
        <Question
          question={questions[currentQuestionIndex]}
          handleOptionSelect={handleOptionSelect}
          handleSubmit={handleSubmit}
          selectedOptions={selectedOptions}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      )}

      {!complete && (
        isLastQuestion ? (
          <button className="bg-white text-blue-900 font-bold px-4 py-2 rounded hover:bg-opacity-80 transition duration-300 ease-in-out mt-8" onClick={handleComplete}>Submit</button>
        ) : (
          <button className="bg-white text-blue-900 font-bold px-4 py-2 rounded hover:bg-opacity-80 transition duration-300 ease-in-out mt-8" onClick={handleNextQuestion}>Next</button>
        )
      )}

      {complete && (
        <div>
          <p className="text-2xl mt-8">The total score is: {totalScore}</p>
          <button className="bg-white text-blue-900 font-bold px-4 py-2 rounded hover:bg-opacity-80 transition duration-300 ease-in-out mt-4" onClick={doReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
