import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export default function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsColRef = collection(db, "posts");

  let navigate = useNavigate();

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
  }

  useEffect(() => {
    if (!isAuth) {
        navigate("/login")
    } else {
    const getPosts = async () => {
      const data = await getDocs(postsColRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts()};
  }, [deletePost]);

  return (
    <div className='homePage'>
        {postLists.map((post) => {
            return <div className='post'>
                <div className='postHeader'>
                    <div className='title'>
                        <h3>{post.title}</h3>
                    </div>
                </div>
                <div className='postTextContainer'>
                    {post.postText}
                </div>
                <h5>-{post.author.name} 
                    {isAuth && post.author.id === auth.currentUser.uid && (
                        <button className='deletePost' onClick={() => {deletePost(post.id)}}>
                            Delete
                        </button>
                    )}
                </h5>                
            </div>
        })}
    </div>
  )
}
