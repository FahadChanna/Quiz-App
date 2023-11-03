import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./Home.css";
import quiz from "./quiz_icon.png";
import quiz1 from "./quiz.jpg";
import Quiz from "../quiz/quiz";
import FetchQuiz from "../Javascript/FetchQuiz";
import FetchQuizPHP from "../PHP/FetchQuizPHP";

const Navbar = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState("");
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [dashboardLinkClicked, setDashboardLinkClicked] = useState(false);
  
    // const overallScore = score + score + score;
    
  
    const updateScoreInHome = (newScore) => {
      setScore(newScore);
    };
  
    const handleSubjectChange = (e) => {
      setSelectedSubject(e.target.value);
    };
  
    const login = () => {
      navigate("/login");
    };
  
    // const calculatePercentage = () => {
    //   return ((score / questions.length) * 100).toFixed(2);
    // };
  
    // const isPass = () => {
    //   return calculatePercentage() >= 50;
    // };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const authenticatedUser = {
            displayName: user.displayName,
            uid: user.uid,
          };
          setUser(authenticatedUser);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          setUser(null);
          navigate("/Login");
        })
        .catch((error) => {
          console.error("Signout error:", error);
        });
    };

    const handleDashboardLinkClick = () => {
        setDashboardLinkClicked(true);
      };
  return (
    <div>
      <nav className="navbar">
        
          <div className="left-section">
            <div className="logo">
              <img src={quiz1} alt="Quiz Logo" />
            </div>
            <ul className="nav-links">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link onClick={handleDashboardLinkClick} to='/Dashboard'>Dashboard</Link>
              </li>
            </ul>
          </div>
          {user ? (
          <div class="subject-dropdown">
            <select value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select a Subject</option>
              <option value="subject1">HTML</option>
              <option value="subject2">JavaScript</option>
              <option value="subject3">PHP</option>
            </select>
          </div>
          ) : null}

          <div className="right-align">
            {user ? (
              <div className="user-box">
                {/* <span className="user-score">Overall Score: {score}/{9}</span>| */}
                <span className="username">Hi, {user.displayName}</span>
                <button
                  className="Sign-out"
                  style={{ cursor: "pointer" }}
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        
      </nav>

      {!dashboardLinkClicked && (
        selectedSubject === "subject1" ? (
          <Quiz updateScoreInHome={updateScoreInHome} score={score} questions={questions} />
        ) : selectedSubject === "subject2" ? (
          <FetchQuiz updateScoreInHome={updateScoreInHome} score={score} questions={questions} />
        ) : selectedSubject === "subject3" ? (
          <FetchQuizPHP updateScoreInHome={updateScoreInHome} score={score} questions={questions} />
        ) : (
          <div className="Note">
            <h2>Please select a subject from the Navbar to start Quiz.</h2>
          </div>
        )
      )}
    </div>
  )
}

export default Navbar
