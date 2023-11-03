import React, { useEffect } from 'react'

function ResultPHP(props) {
  const status = props.subjectPassed ? 'Passed' : 'Failed';

  const saveToLocalStorage = () => {
    const dataPHP = {
      score: props.score,
      totalScore: props.totalScore,
      status: status,
    };
    localStorage.setItem('quizResultPHP', JSON.stringify(dataPHP));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [props.score, props.totalScore, status]);

  return (
    <>
    <div className=''>
      <h2>PHP</h2>
        <p>Your Score in PHP:{props.score}</p><br/>
        <p>Total Score in PHP:{props.totalScore}</p><br/>
        <p>Status: {status}</p> <br/>
        <p className='Note-HTML'>Check your Total Score in the Dashboard</p>
    </div>
    <br/><br/>
    <div>
    {status === 'Failed' && (
          <button id="next-button" onClick={props.tryAgain}>Try Again</button>
        )}  
    </div>
    </>
  )
}

export default ResultPHP