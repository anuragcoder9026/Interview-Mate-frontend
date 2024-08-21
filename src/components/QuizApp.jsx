import React, { useState } from 'react';
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import congratsImg from "../assets/images/congrats.png";
const QuizApp = () => {
  const [quizData] = useState([
    { qid: 1, ques: "What is polymorphism?", ans: "A", options: ["OOP concept", "Machine learning is the algorithm which teaches computer think on its own without implicitly programmed.", "Web 3.0", "Other"] },
    { qid: 2, ques: "What is React?", ans: "B", options: ["CSS framework", "JavaScript library", "Database", "Web server"] },
    { qid: 3, ques: "What is a database?", ans: "C", options: ["Frontend tool", "Styling framework", "Data storage", "Compiler"] },
    { qid: 4, ques: "What is HTML?", ans: "A", options: ["Markup language", "Programming language", "Operating system", "Database"] },
    { qid: 5, ques: "What is CSS?", ans: "B", options: ["JavaScript library", "Styling language", "Markup language", "Database"] }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setUserAnswers({
      ...userAnswers,
      [quizData[currentQuestion].qid]: option
    });
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(userAnswers[quizData[currentQuestion + 1].qid] || null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      setSelectedOption(userAnswers[quizData[prevQuestion].qid] || null);
    }
  };

  const calculateScore = () => {
    return quizData.reduce((score, question) => {
      return userAnswers[question.qid] === question.ans ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const percentage = (score / quizData.length) * 100;

  return (
    <div className="relative pt-10 pl-3 pr-3 min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Glowing spots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-5 left-5 w-24 h-24 rounded-full bg-teal-400 opacity-40 blur-3xl" />
        <div className="absolute top-5 right-5 w-24 h-24 rounded-full bg-teal-400 opacity-40 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-teal-400 opacity-30 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-teal-400 opacity-30 blur-3xl" />
        {/* Additional glowing spots */}
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-yellow-500 opacity-40 blur-3xl" />
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-red-500 opacity-40 blur-3xl" />
      </div>
      <div className="max-w-xl mx-auto p-2 sm:p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 relative z-10">
        {showResults ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <p className="text-lg mb-4">You scored {score} out of {quizData.length} ({Math.round(percentage)}%)</p>
            {percentage >= 60 ? (
              <div>
                <p className="text-xl font-semibold text-green-400">🎉 Congratulations! 🎉</p>
                <p className="text-lg mt-2">Great job! You did really well.</p>
                <img src={congratsImg} alt="Congratulations" className="mx-auto mt-4 w-1/2 rounded-md shadow-lg" />
              </div>
            ) : (
              <div>
                <p className="text-xl font-semibold text-red-400">😓 Better luck next time!</p>
                <p className="text-lg mt-2">Don't worry, keep practicing and you'll improve!</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}/{quizData.length}</h2>
              <p className="text-lg">{quizData[currentQuestion].ques}</p>
            </div>
            <div className="mb-6">
              {quizData[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(String.fromCharCode(65 + index))}
                  className={`w-full py-2 px-2 sm:px-3 mb-2 flex items-center rounded-md border ${selectedOption === String.fromCharCode(65 + index) ? 'bg-gray-700 text-green-400 border-green-400' : 'bg-gray-800 text-gray-400 border-gray-600'} hover:border-green-500 hover:text-green-300`}
                >
                  <div className="">
                    {selectedOption === String.fromCharCode(65 + index) ? (
                      <FaRegDotCircle className="mr-2" style={{ color: "green" }} />
                    ) : (
                      <FaRegCircle className="mr-2 text-white" />
                    )}
                  </div>  
                  <div className="flex items-center justify-center">{option}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`py-2 px-4 rounded-md text-white ${currentQuestion === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'} transition duration-300`}
                style={{ width: "100px" }}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`flex py-2 px-4 rounded-md text-white ${selectedOption ? 'bg-blue hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'} transition duration-300`}
                style={{ width: "100px" }}
              >
                {currentQuestion < quizData.length - 1 ? 'Next' : 'Submit'}
                <TbPlayerTrackNextFilled style={{ marginTop: "5px", marginLeft: "5px" }} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
