import React, { useEffect } from 'react'

function ResultJs(props) {
  const status = props.subjectPassed ? 'Passed' : 'Failed';

  const saveToLocalStorage = () => {
    const dataJs = {
      score: props.score,
      totalScore: props.totalScore,
      status: status,
    };
    localStorage.setItem('quizResultJs', JSON.stringify(dataJs));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [props.score, props.totalScore, status]);

  return (
    <>
    <div class='Status'>
      <h2>Javascript</h2>
        <p>Your Score in Javascript:{props.score}</p><br/>
        <p>Total Score in JavaScript:{props.totalScore}</p><br/>
        <p>Status: {status}</p> <br/>
        <p className='Note-HTML'>Go for the PHP in the Navigation bar</p>
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

export default ResultJs