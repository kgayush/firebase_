import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ setIsAuth }) {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    let navigate = useNavigate();
    let isErrorOccur = false;

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

      const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          console.log(user);
        } catch (error) {
          isErrorOccur = true;
          console.log(error.message);
        }
        if (!isErrorOccur) {
          setIsAuth(true);
          navigate("/");
        }
      };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true)
            setIsAuth(true)
            navigate("/")
        })
    };

  return (
    <div className='loginPage'>
        <h3> Login </h3>
        <input placeholder="Email" onChange={(event) => {
            setLoginEmail(event.target.value);
          }}/>
        <input type="password" placeholder="Password" onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br/>
        <button onClick={login}> Login </button>
        <br/>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Login with Google</button>
    </div>
  )
}
