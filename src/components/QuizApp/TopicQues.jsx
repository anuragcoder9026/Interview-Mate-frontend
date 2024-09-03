
import React, { useState,} from 'react';

const TopicQues = ({dispatch}) => {
  const [topic, setTopic] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Topic:', topic);
    console.log('Number of Questions:', numOfQuestions);
    // Further logic for handling quiz generation can be added here

    
    dispatch({
        type: "topicQuestion",
        payload: {topic:topic,nofQues:numOfQuestions},
      })
  };

  return (
    <div className="flex justify-center items-center w-full md:w-[95%] bg-gray-900 rounded">
      <form onSubmit={handleSubmit} className="p-6 px-4 sm:px-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Your Quiz</h2>

        <div className="mb-5 w-full">
          <label htmlFor="topic" className="block font-bold mb-2">Topic Name</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue"
            placeholder="Enter the topic"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numOfQuestions" className="block font-bold mb-2">Number of Questions</label>
          <input
            type="number"
            id="numOfQuestions"
            value={numOfQuestions}
            onChange={(e) => setNumOfQuestions(e.target.value)}
            min="5"
            max="25"
            step="5"
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue"
            placeholder="Enter number of questions"
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TopicQues;