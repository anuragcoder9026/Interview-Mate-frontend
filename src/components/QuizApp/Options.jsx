function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="ml-3 w-full">
      {question.options.map((option, index) => (
        <button
          className={`w-full btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
    {option.code ? (
  <code>{option.code}</code>
) : (
  typeof option === 'object' ? JSON.stringify(option) : option
)}
        </button>
      ))}
    </div>
  );
}

export default Options;