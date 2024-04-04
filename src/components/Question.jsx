import React from 'react';

function Question({ question, handleOptionSelect, handleSubmit, selectedOptions, showResult, isCorrect }) {
  const isSingleCorrect = !question.multicorrect;

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 text-white font-serif p-6 rounded-lg shadow-lg">
      <h3 className="text-4xl font-bold mb-6">{question.question}</h3>
      {question.questionImage && <img src={question.questionImage} alt="Question" className="mb-6" />}
      {question.options.map(option => (
        <div key={option.id}>
          <label className="block my-4 cursor-pointer hover:bg-gray-800 rounded-lg p-4 transition duration-300">
            <input
              type={isSingleCorrect ? 'radio' : 'checkbox'}
              checked={selectedOptions.has(option.id)}
              onChange={() => handleOptionSelect(option.id)}
            />
            <span className="ml-4 text-2xl">{option.text}</span>
            {option.image && <img src={option.image} alt="Option" className="w-24 h-24 object-cover ml-4" />}
          </label>
        </div>
      ))}
      <button className="mt-6 px-6 py-3 bg-white text-purple-900 font-bold rounded hover:bg-opacity-80 transition duration-300 ease-in-out" onClick={handleSubmit}>Save</button>
      {showResult && (
        <div className="mt-4">
          {isCorrect ? <p className="text-green-500">Correct!</p> : <p className="text-red-500">Incorrect!</p>}
        </div>
      )}
    </div>
  );
}

export default Question;
