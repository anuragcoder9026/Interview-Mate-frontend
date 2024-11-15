<<<<<<< HEAD
function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
=======
import React, { useEffect } from "react";
import axios from "axios";

const saveScore = async (score, topic,total) => {
  console.log(score);
  try {
    const response = await axios.post(
      'http://localhost:3200/api/saveresult',
      { topic, score,total },
      { withCredentials: true }
    );
    console.log('Score saved successfully:', response.data);
  } catch (error) {
    console.error('Failed to save score:', error.response?.data || error.message);
  }
};

function FinishScreen({ topic, points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  useEffect(() => {
    // Call saveScore only once on component mount
    saveScore(points, topic,maxPossiblePoints);
  }, [points, topic,maxPossiblePoints]);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙃";
  else if (percentage > 0) emoji = "🤨";
  else emoji = "🤦‍♂️";
>>>>>>> 9e904d66572461b92fa34095bfffcf0e07918051

  return (
    <div className="result_container">
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore"><b>Highscore:</b>&nbsp;{highscore}/{maxPossiblePoints}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
