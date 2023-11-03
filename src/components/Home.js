import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./Home.css";
// import quiz from "./quiz_icon.png";
import Quiz from "../quiz/quiz";
import FetchQuiz from "../Javascript/FetchQuiz";
import FetchQuizPHP from "../PHP/FetchQuizPHP";
import Navbar from "./Navbar";
import QuizResult from "../quiz/QuizResult";
import ResultPHP from "../PHP/ResultPHP";
import ResultJs from "../Javascript/ResultJs";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);


  // const overallScore = score + score + score;
  const overallTotalScore = questions.length + questions.length + questions.length;

  const updateScoreInHome = (newScore) => {
    setScore(newScore);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const login = () => {
    navigate("/login");
  };

  const calculatePercentage = () => {
    return ((score / questions.length) * 100).toFixed(2);
  };

  const isPass = () => {
    return calculatePercentage() >= 50;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const authenticatedUser = {
          displayName: user.displayName,
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
  return (
    <div>
      <Navbar />
      


    </div>
  );
};

export default Home;
