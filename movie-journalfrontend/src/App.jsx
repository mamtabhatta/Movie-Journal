import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Register/SignUp";
import Signin from "./pages/Register/SignIn";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddMovie from "./pages/AddMovie/AddMovie";
import Watchlist from "./pages/WatchList/WatchList";
import MovieDetail from "./pages/MovieDetail/MovieDetail";

// create protected routes for Home page.
// research about component props
// learn about context
// alternative to context - redux, mobx
// logout button, set token in localstorage to null or delete

// fetch token from localstorage
// if token exists, set isAuth state to true
// if isAuth ? <home /> : <signin />


function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  return (
    <Router>

      {isAuth && <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Home /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/signup"
          element={
            !isAuth ? <Signup setIsAuth={setIsAuth} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/signin"
          element={
            !isAuth ? <Signin setIsAuth={setIsAuth} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuth ? <Dashboard setIsAuth={setIsAuth} /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/addMovie"
          element={
            isAuth ? <AddMovie setIsAuth={setIsAuth} /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/watchlist"
          element={
            isAuth ? <Watchlist setIsAuth={setIsAuth} /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/movieDetail/:id"
          element={
            isAuth ? <MovieDetail setIsAuth={setIsAuth} /> : <Navigate to="/signin" replace />
          }
        />

      </Routes>
      {isAuth && <Footer />}

    </Router>
  );
}

export default App;