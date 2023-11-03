import "./App.css";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import PrivateRoute from "./PrivateRoute";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddQuizz from "./quiz/AddQuizz";
import QuizJavasrpt from "./Javascript/QuizJavascrpt";
import AddQuiz from "./PHP/AddQuiz";
import Dashboard from "./components/Dashboard";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);

  const updateScore = (newScore) => {
    setScore(newScore);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setUser(user);
      } else {
        setUserName("");
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/AddQuizz" element={<AddQuizz/>}></Route>
          <Route path="/QuizJavascrpt" element={<QuizJavasrpt/>}></Route>
          <Route path="/AddQuizPHP" element={<AddQuiz/>}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/" element={
              user ? (
                <Home user={user} />
              ) : (
                <Navigate to="/Login" />
              )
            } />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
