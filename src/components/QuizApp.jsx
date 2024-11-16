import React, { useState, useEffect } from 'react';
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { generateQuizData } from './GenerateQuizData';
import { useUserContext } from '../context/usercontext';
import axios from 'axios';

const QuizApp = () => {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('All topic');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Handle selecting an option
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: index,
    }));
  };

  // Handle clicking the Next button
  const handleNext = () => {
    if (selectedOption !== null) { // Ensure an option is selected
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion]: selectedOption,
      }));
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        calculateScore();
        setShowResults(true);
        saveScore();
      }
      // Reset selectedOption for next question
      setSelectedOption(userAnswers[currentQuestion + 1] ?? null);
    }
  };

  // Handle clicking the Previous button
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion]: selectedOption,
      }));
      setCurrentQuestion((prev) => prev - 1);
      // Reset selectedOption for previous question
      setSelectedOption(userAnswers[currentQuestion - 1] ?? null);
    }
  };

  const calculateScore = () => {
    return quizData.reduce((score, question, index) => {
      return userAnswers[index] === question.correctOption ? score + question.points : score;
    }, 0);
  };

  const fetchQuizData = async () => {
    setStep(3);
    try {
      let data;
      if (topic === 'All topic') {
        data = await generateQuizData('All question related to computer science', numQuestions);
      } else {
        data = await generateQuizData(topic, numQuestions);
      }
      setQuizData(data["questions"]);
      // Reset currentQuestion and selectedOption
      setCurrentQuestion(0);
      setSelectedOption(userAnswers[0] ?? null);
    } catch (error) {
      console.error('Failed to fetch quiz data:', error);
    }
  };

  const score = calculateScore();
  const percentage = (quizData.length > 0) ? (score / (quizData.length * 10)) * 100 : 0;


  return (
    <div className="flex justify-center items-center pl-3 pr-3 min-h-[80vh] bg-gray-900 text-gray-100 overflow-hidden">
      <div className="w-[100%] md:w-[75%] lg:w-[60%] p-2 sm:p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Enter Quiz Topic</h2>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Type your quiz topic..."
              className="w-full p-2 mb-4 rounded-md bg-gray-700 border border-gray-600 text-white"
            />
            <button
              onClick={() => setStep(2)}
              className="w-full py-2 px-4 rounded-md bg-blue text-white transition duration-300"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Enter Number of Questions</h2>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              placeholder="Number of questions"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 border border-gray-600 text-white"
            />
            <button
              onClick={fetchQuizData}
              disabled={numQuestions <= 0}
              className="w-full py-2 px-4 rounded-md bg-blue text-white transition duration-300"
            >
              Start Quiz
            </button>
          </div>
        )}

        {step === 3 && quizData.length === 0 && <h1 className="text-2xl flex justify-center">Preparing Your Quiz....</h1>}
        
        {step === 3 && !showResults && quizData.length > 0 && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}/{quizData.length}</h2>
              <p className="text-lg">{quizData[currentQuestion].question}</p>
            </div>
            <div className="mb-6">
              {quizData[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full py-2 px-2 sm:px-3 mb-2 flex items-center rounded-md border cursor-pointer ${selectedOption === index ? 'bg-gray-700 text-green-400 border-green-400' : 'bg-gray-800 text-gray-400 border-gray-600'} hover:border-green-500 hover:text-green-300`}
                >
                  <div>
                    {selectedOption === index ? (
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
                className={`py-2 px-4 rounded-md text-white ${currentQuestion === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-blue'} transition duration-300`}
                style={{ width: "100px" }}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`flex py-2 px-4 rounded-md text-white ${selectedOption !== null ? 'bg-blue' : 'bg-gray-600 cursor-not-allowed'} transition duration-300`}
                style={{ width: "100px" }}
              >
                {currentQuestion < quizData.length - 1 ? 'Next' : 'Submit'}
                <TbPlayerTrackNextFilled style={{ marginTop: "5px", marginLeft: "5px" }} />
              </button>
            </div>
          </>
        )}

        {showResults && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <p className="text-lg mb-4">You scored {score} out of {quizData.length * 10} ({Math.round(percentage)}%)</p>
            {percentage >= 60 ? (
              <div>
                <p className="text-xl font-semibold text-green-400">🎉 Congratulations! 🎉</p>
                <p className="text-lg mt-2">Great job! You did really well.</p>
              </div>
            ) : (
              <p className="text-lg font-semibold text-red-400">😟 Better luck next time!</p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 mt-6 rounded-md bg-gray-700 text-white transition duration-300"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;