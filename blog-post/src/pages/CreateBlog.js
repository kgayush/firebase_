import React, { useState, useEffect } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';



export default function CreateBlog({ isAuth }) {
const [title, setTitle] = useState("");
const [postText, setPostText] = useState("");

const postsColRef = collection(db, "posts");
let navigate = useNavigate();
const createPost = async () => {

  if (!title || !postText) {
    alert('Please fill the all fields')
  } else {
  await addDoc(postsColRef, {
    title, 
    postText, 
    author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
    createdAt: Timestamp.now().toDate()
  })
  navigate("/")
}};

useEffect(() => {
  if (!isAuth) {
    navigate("/login")
  }

}, []);

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Post a Blog</h1>
        <div className='inputGp'></div>
          <label>Title</label>
          <input onChange={(event) => {setTitle(event.target.value)}}/>
        <div className='inputGp'>
            <label>Blog</label>
            <textarea onChange={(event) => {setPostText(event.target.value)}}/>
        </div>
        <button onClick={createPost}>Post</button>
      </div>
    </div>
  )
}
