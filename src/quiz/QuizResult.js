import React, { useEffect } from 'react'
import {db} from '../firebase'
import { push, ref, set } from 'firebase/database';
import './QuizResult.css';

function QuizResult(props) {
  const status = props.subjectPassed ? 'Passed' : 'Failed';

  const saveToLocalStorage = () => {
    const data = {
      score: props.score,
      totalScore: props.totalScore,
      status: status,
    };
    localStorage.setItem('quizResult', JSON.stringify(data));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [props.score, props.totalScore, status]);

  return (
    <>
    <div className='Status'>
        <h2>HTML</h2>
        <p>Your Score:{props.score}</p><br/>
        <p>Total Score:{props.totalScore}</p><br/>
        <p>Status: {status} </p> <br/>
    </div>
        <p className='Note-HTML'>Go for the Javascript in the Navigation bar</p>     
    <div>
    {status === 'Failed' && (
          <button id="next-button" onClick={props.tryAgain}>Try Again</button>
        )}  
    </div>
    </>
  )
}

export default QuizResult