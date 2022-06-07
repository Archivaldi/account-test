import React, {useState} from "react";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);

    const handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        id === 'email' ? setEmail(value) : setPassword(value);
    };

    const submit = async () => {
        if (email && password) {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const responseData = await response.json();
        } else {
            
            setError("Email and Password are required to log in");
        }
    };

    return (
        <div>
            <label>Email: </label>
            <input value={email} id="email" onChange={(e) => handleChange(e)} />
            <label>Password: </label>
            <input value={password} id="password" onChange={(e) => handleChange(e)} />
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default Login;