import React, {useState} from 'react'
import { NavLink, useHistory } from "react-router-dom";
import './css/Header.css'
import PostList from './PostList';

function Header({currentUser, setCurrentUser, handleSetUser, posts, setSearchPost, setPost}) {
    const [search, setSearch] = useState('')
    const history = useHistory();
    

    function handleSubmit(e) {
        e.preventDefault()
        const postResult = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
        const renderSearch = postResult.map((post) => <PostList key={post.id} post={post} setPost={setPost} />)
        setSearchPost(renderSearch)
        history.push(`/search`)

        e.target.reset()
    }

    function logout() {
        localStorage.removeItem("token");
        setCurrentUser(null);
    }

    return (
        <header className="header">
            <NavLink className="home logo" to="/">Watch It</NavLink>
            <form className="search"onSubmit={handleSubmit}> 
                <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            
            <nav className="navigation">
                {/* <NavLink className="link" to="/trending">Trending</NavLink> */}
                <NavLink className="link" to="/recent">Recent</NavLink>
                { currentUser? (
                    <>
                        <NavLink to={`/profile/${currentUser.id}`}  onClick={handleSetUser}   className="name">{currentUser.name}</NavLink>
                        <button className="logout" onClick={logout}>Logout</button> 
                    </>
                ) : (
                    <>
                        <NavLink className="link" to="/login">Login</NavLink> 
                        <NavLink className="link" to="/signup">Signup</NavLink> 
                    </>
                )}
                
            </nav>
        </header>
    )
}

export default Header
