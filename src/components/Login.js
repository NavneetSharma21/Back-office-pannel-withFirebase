import React, { useState } from "react";

const Login = (props) => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("");

    return (
        <div className="Login">
            <div className="Login-sec">
                <h1>Login user</h1>
                <input type="text"
                    placeholder="enter your username"
                    value={user} onChange={(e) => setUser(e.target.value)}></input>
                <input type="password"
                    placeholder="enter your password"
                    value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" onClick={(e)=>{props.onLogin(user,password)}}>Login</button>
            </div>
        </div>
    )
}
export default Login;