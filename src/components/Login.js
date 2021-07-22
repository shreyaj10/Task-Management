import React, { useState } from 'react'
import axios from 'axios'
import {Redirect , useHistory} from 'react-router-dom'




function Login() {
    let history = useHistory();
    const [input, setInput] = useState({
       
        password: '',
        email: '',
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })

    }

    function handleClick(event) {
        event.preventDefault();
        const newUser = {
            email: input.email,
            password: input.password,

        }
        console.log(newUser)
        axios.post("http://localhost:3001/login", newUser)
            .then(async (res) =>{
                const data = await res.data;
                // console.log("resdata", res.data);
                localStorage.setItem('token', res.data)
                console.log(res)
                history.push('./tasks')
            })
            
            .catch(error => {
                console.log(error);
            });
            
    }
    return (
        <div className="createUser">
            <form className="login">
                <h1 id="login">Log in</h1>
                <div className="Input" >
                    <label form="Email"  className="email"></label>
                    <input onChange={handleChange} name='email'placeholder="Enter Email" value={input.email} className="form-control" id="Email" />
                </div>
                <div className="Input">
                    <label form="password" ></label>
                    <input type="password" onChange={handleChange} name='password'  placeholder="Enter password" value={input.password} className="form-control" id="password" />
                </div>
                <button onClick={handleClick} type="submit" className="btn1">Submit</button>
            </form>
        </div>
    )






}

export default Login
