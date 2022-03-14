
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })
  }

  return (
    <Router>
      <nav>
        
        
        { !isAuth ? (
          <>
            <Link to={"/signup"}>Signup</Link>
            <Link to={"/login"}>Login</Link> 
          </>
        ) : ( 
          <>
            <Link to={"/createblog"}>Create Blog</Link>
            <button onClick={signUserOut}>Logout</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/createblog" element={<CreateBlog isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
