import React, { useState, useEffect } from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import './css/Body.css'
import PostForm from "./PostForm";
import Post from './Post';
import Profile from './Profile';
import Recent from './Recent';
import Trending from './Trending';
import Community from './Community';
import SearchPage from './SearchPage';

function Body({setCurrentUser, currentUser, user, users, setUsers, handleSetUser, posts, setPosts, searchPost, post, setPost, setUser}) {
    const [community, setCommunity] = useState(null)
    const [comment, setComment] = useState()
    const path = window.location.pathname
    let lastId 
    if(path) {
        lastId = path.split('/')
    }
    
    const postId = parseInt(lastId[2])
    console.log(postId)
    const [communities,setCommunities] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/posts`)
        .then((response) => response.json())
        .then((data) => {
            setPosts(data)
        })

        fetch(`http://localhost:4000/users`)
        .then((response) => response.json())
        .then((data) => {
            setUsers(data)
            
        })

        fetch("http://localhost:4000/communities")
        .then(response => response.json())
        .then((data) => {
            setCommunities(data)
        })

        
    
    },[postId, comment, user, post, community])


    const postPage = posts.filter((post) => post.id === postId)
    const renderPost = postPage.map((post) => <Post key={post.id} post={post} currentUser={currentUser} setPost={setPost} setComment={setComment} setUser={setUser} />)
    const communityPage = communities.filter((community) => community.id === postId)
    const renderCommunity = communityPage.map((community) => <Community key={community.id} community={community} currentUser={currentUser} setPost={setPost}/>)
    const userPage = users.filter((user) => user.id === postId)
    const renderUser = userPage.map((user) => <Profile key={user.id} user={user} currentUser={currentUser} setPost={setPost} setUser={setUser}/> )


    return (
        <div className="body">
            <Switch>
                <Route exact path="/profile/:id">
                    { userPage? renderUser :
                        user ? <Profile user={user} currentUser={currentUser} users={users} setUser={setUser}/> : null
                    }
                </Route>
                <Route exact path="/">
                    <Home currentUser={currentUser} setPost={setPost} />
                </Route>
                <Route exact path="/login">
                    <Login setCurrentUser={setCurrentUser} handleSetUser={handleSetUser} />
                </Route>
                <Route exact path="/recent">
                    <Recent currentUser={currentUser} setPost={setPost} />
                </Route>
                <Route exact path="/signup">
                    <Signup setCurrentUser={setCurrentUser} />
                </Route>
                <Route exact path="/trending">
                    <Trending currentUser={currentUser} setPost={setPost}/>
                </Route>
                <Route exact path="/create_post">
                    <PostForm currentUser={currentUser} community={community} users={users} setPost={setPost}/>
                </Route>
                <Route exact path="/posts/:id" >
                    { postPage ? renderPost :
                        post ? <Post post={post} currentUser={currentUser} setPost={setPost} setComment={setComment} setUser={setUser} /> : null
                    }
                </Route>
                <Route exact path="/communities">
                    <Home currentUser={currentUser} setPost={setPost} communities={communities} setCommunity={setCommunity}/>
                </Route>
                <Route exact path="/community/:id">
                    { communityPage ? renderCommunity :
                        community ? <Community community={community} setCommunity={setCommunity} currentUser={currentUser} setPost={setPost}/> : null    
                    }
                </Route>
                <Route exact path="/search">
                    <SearchPage currentUser={currentUser} setPost={setPost} searchPost={searchPost} />
                </Route>
            </Switch>
        </div>
    )
}

export default Body 
