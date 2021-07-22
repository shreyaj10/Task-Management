import React, { useState } from 'react'
import axios from 'axios'
import {useHistory, userHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'




function SignUp() {
    let history= useHistory();
    const [input, setInput] = useState({
        username: '',
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
            username: input.username,
            email: input.email,
            password: input.password,

          


        }
        console.log(newUser)
        axios.post("https://task-management-web1.herokuapp.com/signup", newUser)
            .then(async (res) =>{
                const data = await res.data;

                history.push('/login')
            })
            
            .catch(error => {
                console.log(error);
            });
            
    }
    return (
        <div className="createUser">
                
            <form className="Signup">
                <h1 id="sign">Sign Up</h1>
                <div className="Input" >
                    <label form="username" placeholder="Enter Username" className="username"></label>
                    <input onChange={handleChange} name='username' placeholder="Enter Username" value={input.username} className="form-control" id="username" />
                </div>
                <div className="Input" >
                    <label form="Email" placeholder="Enter Email" className="email"></label>
                    <input onChange={handleChange} name='email' placeholder="enter email" value={input.email} className="form-control" id="Email" />
                </div>
                <div className="Input">
                    <label form="password" ></label>
                    <input type="password" onChange={handleChange} name='password'  placeholder="enter password" value={input.password} className="form-control" id="password" />
                </div>
                <button onClick={handleClick} type="submit" className="btn1">Submit</button>
                <h4 ><Link to="/login" id="remark">Already a user? Click here to login</Link></h4>
            </form>
        </div>
    )






}

export default SignUp
