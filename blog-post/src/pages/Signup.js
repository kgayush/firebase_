import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut,} from "firebase/auth";

export default function Signup() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    let navigate = useNavigate();
    let isErrorOccurred = false;
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          )} catch(error) {
            console.log(error.message);
          }
          if (!isErrorOccurred) {
            navigate("/");
          }
        };
  return (
    <div className="loginPage">      
        <h3> Signup </h3>
        <input placeholder="Email" onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}/>
        <input type="password" placeholder="Password" onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <br/>
        <button onClick={register}> Signup</button>
    </div>
  );
}

