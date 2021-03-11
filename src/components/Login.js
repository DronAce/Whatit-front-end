import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

function Login({setCurrentUser, handleSetUser}) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const login = {
            username: username,
            password: password
        }
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(login)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    const { user, token } = data;
                    localStorage.setItem("token", token);
                    setCurrentUser(user);
                    history.push(`/profile/${user.id}`);
                }
            })
        e.target.reset()
    }

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit} >
                <h1>Login</h1>
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete = 'username'
                    required
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} 
                    autoComplete="current-password"
                    required
                />
                {errors.map((error) => { return <p key={error}>{error}</p> })}
                <button type="submit" onClick={handleSetUser} >Login</button>
            </form>
        </div>
    )
}

export default Login
