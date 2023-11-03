import React, { useState, useEffect } from 'react';
import ResultJs from './ResultJs'; 
import './FetchQuiz.css';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';

function FetchQuiz({ updateScoreInHome }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [subjectPassed, setSubjectPassed] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = ref(db, 'Js');
        const questionsSnapshot = await get(questionsRef);

        if (questionsSnapshot.exists()) {
          const questionData = questionsSnapshot.val();
          const questionArray = Object.keys(questionData).map((key) => questionData[key]);
          setQuestions(questionArray);
        } else {
          console.error('No questions found in the database.');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    const currentQuestionData = questions[currentQuestion];
    console.log("Clicked Option:", clickedOption);
    console.log("Correct Answer:", currentQuestionData.Answer);

    if (clickedOption === currentQuestionData.Answer) {
      setScore(score + 1);
      updateScoreInHome((prevHomeScore) => prevHomeScore + 1);
    }
  };
  

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setSubjectPassed(false);
  };

  const calculateSubjectStatus = () => {
    const percentage = (score / questions.length) * 100;
    const isPassed = percentage >= 50;
    setSubjectPassed(isPassed);
  };

  useEffect(() => {
    calculateSubjectStatus();
  }, [score, questions]);

  return (
    <div className="quiz-containar">
      <div className="cunntainer">
        {showResult ? (
          <ResultJs score={score} subjectPassed={subjectPassed} totalScore={questions.length} tryAgain={resetAll} />
        ) : questions.length > 0 ? (
          <>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">{questions[currentQuestion].question}</span>
            </div>
            <div className="option-container">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  className={`optionbtn ${clickedOption === i + 1 ? 'checked' : ''}`}
                  key={i}
                  onClick={() => setClickedOption(i + 1)}
                >
                 {option}
                </button>
              ))}
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
          </>
        ) : (
          <p>No questions found in the database.</p>
        )}
      </div>
    </div>
  );
}

export default FetchQuiz;
