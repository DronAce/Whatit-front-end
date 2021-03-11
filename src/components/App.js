import React, { useEffect, useState } from "react";
import Body from './Body';
import './css/App.css'
import Header from './Header';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState()
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [searchPost, setSearchPost] = useState([])
  const [post, setPost] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      fetch('http://localhost:4000/me', {
        headers: { Authorization: `Bearer ${token}`,},
      })
        .then((response) => response.json())
        .then((user) => {
          setCurrentUser(user)
        })
    }

    fetch(`http://localhost:4000/users`)
    .then((response) => response.json())
    .then((data) => { 
      setUsers(data)
            
    })

    fetch(`http://localhost:4000/posts`)
    .then((response) => response.json())
    .then((data) => {
      setPosts(data)
    })

  },[])

  function handleSetUser(){
    const user = users.filter((user) => user.id === currentUser.id)
    setUser(user[0])
  }


  return (
    <div className="app">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} handleSetUser={handleSetUser} posts={posts} setSearchPost={setSearchPost} setPost={setPost}/>
      <Body setCurrentUser={setCurrentUser} currentUser={currentUser} user={user} setUser={setUser} setUsers={setUsers} users={users} posts={posts} setPosts={setPosts} searchPost={searchPost} post={post} setPost={setPost} />
    </div>
  );
}

export default App;
