import React, { useState } from 'react'
import './AddQuiz'
import {db} from '../firebase'
import {push, ref, set} from 'firebase/database'
import { Link } from 'react-router-dom'

const AddQuiz = () => {
    const [addQues, setAddQues] = useState('')
    const [addOption, setAddOption] = useState('')
    const [options, setOptions] = useState([])
    const [Answer, setAnswer] = useState('') 

    const addOpt = () => {
        if (addOption.trim() === '') return;
    
        setOptions([...options, addOption]);
        setAddOption('');
        console.log(options)
      };
      
      const CorrectAns = (option) => {
        const selectedIndex = options.indexOf(option); // Get the index of the selected option
        setAnswer(selectedIndex + 1); // Set the answer as the index (add 1 to start from 1)
      };

      const renderOptions = () => {
        return options.map((option, index) => (
          <li key={index} onClick={()=>CorrectAns(option)}>{index+1}. {option}</li>
        ));
      };

    const submitQuestion = () => {
        var obj = {
            question: addQues,
            options: options,
            Answer: Answer
        }
        const newQuestionRef = push(ref(db, 'PHP'));

        const newQuestionId = newQuestionRef.key;

        obj.id = newQuestionId;

        const reference = ref(db, `PHP/${newQuestionId}`);
        set(reference, obj);


        setAddQues('');
        setAddOption('');
        setOptions([]);
        setAnswer('');

    }
  return (
    <div>
      <nav className="navbarQ">
          <li>
            <Link to="/AddQuizz">HTML</Link>
          </li>
          <li>
            <Link to="/QuizJavascrpt">JavaScript</Link>
          </li>
          <li>
            <Link to="/AddQuizPHP">PHP</Link>
          </li>
      </nav>
    <div className="add-quiz-container">
        <h2>Add Quiz in PHP</h2>
      <div className='question'>
        <textarea placeholder='Add Question' cols={30} rows={5} onChange={(e)=>setAddQues(e.target.value)}></textarea>
      </div>
      <div className='options'>
        <input type='text' placeholder='Add Options' value={addOption} onChange={(e)=>setAddOption(e.target.value)}></input>
        <button onClick={addOpt}>Add</button>
      </div>
      <div>
      <ol className="options-list">
          {renderOptions()}
        </ol>
      </div>
      <div>
        <p>Correct Answer: {Answer}</p>
      </div>
      <div>
        <button className='submit-btn' onClick={submitQuestion}>Submit Question</button>
      </div>
    </div>
    </div>
  )
}

export default AddQuiz

