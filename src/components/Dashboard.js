import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import quiz from "./quiz_icon.png";
import "./Dashboard.css";
import Dumy from "./Dumy";
import Home from "./Home";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);


  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const goBack = () => {
    navigate("/");
  };

  const login = () => {
    navigate("/login");
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

  const quizResult = JSON.parse(localStorage.getItem("quizResult"));

  const status = quizResult ? quizResult.status : "No status available";
  const score = quizResult ? quizResult.score : "No score available";

  const quizResultJs = JSON.parse(localStorage.getItem("quizResultJs"));

  const statusJs = quizResultJs ? quizResultJs.status : "No status available";
  const scoreJs = quizResultJs ? quizResultJs.score : "No score available";

  const quizResultPHP = JSON.parse(localStorage.getItem("quizResultPHP"));

  const statusPHP = quizResultPHP ? quizResultPHP.status: "No status available";
  const scorePHP = quizResultPHP ? quizResultPHP.score : "No score available";

  const noRecordFound =
    !quizResult || (!quizResult.status && !quizResult.score);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="main-body">
        <div className="Dashboard-container">
          <div>
            <FontAwesomeIcon
              className="back-icon"
              icon={faArrowLeft}
              onClick={goBack}
            />
          </div>
          {noRecordFound ? (
            <div className="NoRecord">
              <h2>No Record Found</h2>
            </div>
          ) : (
            <>
              {quizResult && quizResult.status && quizResult.score && (
                <div className="HTML">
                  <h2>HTML</h2>
                  <p>Status: {quizResult.status}</p>
                  <p>Score: {quizResult.score}</p>
                </div>
              )}
              <br />
              <br />
              {quizResultJs && quizResultJs.status && quizResultJs.score && (
                <div className="JavaScript">
                  <h2>JavaScript</h2>
                  <p>Status: {quizResultJs.status}</p>
                  <p>Score: {quizResultJs.score}</p>
                </div>
              )}
              <br />
              <br />
              {quizResultPHP && quizResultPHP.status && quizResultPHP.score && (
                <div className="PHP">
                  <h2>PHP</h2>
                  <p>Status: {quizResultPHP.status}</p>
                  <p>Score: {quizResultPHP.score}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
