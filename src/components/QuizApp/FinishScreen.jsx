const saveScore = async (score, topic, total, user_id) => {
  console.log(score);
  try {
    const response = await axios.post(
      'https://interview-mate-backend.onrender.com/api/saveresult',
      { topic, score, total, user_id },  // Send user_id along with other data
      { withCredentials: true }
    );
    console.log('Score saved successfully:', response.data);
  } catch (error) {
    console.error('Failed to save score:', error.response?.data || error.message);
  }
};

// Example usage in FinishScreen component
function FinishScreen({ topic, points, maxPossiblePoints, highscore, dispatch, user_id }) {
  const percentage = (points / maxPossiblePoints) * 100;

  useEffect(() => {
    // Call saveScore only once on component mount
    saveScore(points, topic, maxPossiblePoints, user_id);
  }, [points, topic, maxPossiblePoints, user_id]);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙃";
  else if (percentage > 0) emoji = "🤨";
  else emoji = "🤦‍♂️";

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
