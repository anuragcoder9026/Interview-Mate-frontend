function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress" style={{
      marginBottom: '2rem',
      display: 'grid',
      justifyContent: 'space-between',
      gap: '1.2rem',
      gridTemplateColumns: 'auto auto',
      fontSize: 'calc(100vmin - 97vmin)',
      color: '#ced4da', 
    }}>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
