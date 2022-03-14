import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuth }) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true)
            setIsAuth(true)
            navigate("/")
        })
    };

  return (
    <div className='loginpage'>
        
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Signin with Google</button>
    </div>
  )
}
