function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2 style={{
      fontSize: 'calc(100vmin - 96vmin)',
      marginBottom: '0.6rem',
      textAlign: 'center',
      color: 'rgb(0, 216, 255)',
      fontWeight: 'bold',
    }}>Welcome to The Interview Mate Quiz!</h2>
      <h3 style={{
      fontSize: 'calc(100vmin - 97.5vmin)',
      fontWeight: 600,
      marginBottom: '1rem',
      textAlign: 'center',
    }}>Let's Enhance Your Knowledge...</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
