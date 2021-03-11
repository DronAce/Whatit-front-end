import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup({setCurrentUser}) {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        name:"",
        password: "",
    });

    function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })  
        .then((response) => response.json())
        .then((data) => {
            if(data.errors) {
                setErrors(data.errors);
            } else {
                const {user, token} = data;
                localStorage.setItem('token', token);
                setCurrentUser(user)
                history.push(`/profile/${user.id}`);
            }
        })
    }

    const { username, name, password } = formData;

    return (
        <div className="signup">
            <form className="form" onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Username"
                    autoComplete = 'username'
                    value={username}
                    onChange={handleChange} 
                    required
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange}  
                    required
                />
                <input 
                    name="name" 
                    type="text" 
                    placeholder="Name"
                    autoComplete="name"
                    value={name}
                    onChange={handleChange}  
                    required
                />
                {errors.map((error) => { return <p key={error}>{error}</p> })}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Signup
