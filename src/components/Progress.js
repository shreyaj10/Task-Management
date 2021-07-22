import { useState, useEffect } from "react"
import React  from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

function Progress() {
    let history=useHistory()
    const [total, settotal] = useState(0)
    const [assigned, setassigned] = useState(0)
    const [completed, setcompleted] = useState(0)
    const [completedLate, setcompletedLate] = useState(0)
    const [overdue, setoverdue] = useState(0)
    const [user, setUser] = useState({
        username:'',
        email:"",
        password:"",
        _id:""
        
      })
       

    useEffect(() => {
        fetch('https://task-management-web1.herokuapp.com/tasks').then(res=>{
            if (res.ok){
                return res.json()
            }
        }).then(jsonRes=>{
            jsonRes.map((task)=>{
                if(task.username===user.username && task.status==="assigned"){
                    setassigned(total=>{
                        return total+1
                    })
                    settotal(total=>{
                        return total+1
                    })
                }else if(task.username===user.username && task.status==="completed!"){
                    setcompleted(num=>{
                        return num+1
                    })
                    settotal(total=>{
                        return total+1
                    })
                }else if(task.username===user.username && task.status==="completed late"){
                        setcompletedLate(num1=>{
                            return num1+1
                        })
                        settotal(total=>{
                            return total+1
                        })
                    
                }

                if(task.username===user.username && task.timeDue-Date.now()<=0 && task.status==="assigned"){
                    setoverdue(num=>{
                        return num+1
                    })
                    settotal(total=>{
                        return total+1
                    }) 
                }
            })
        }
            );
        
    
    let token=localStorage.getItem('token');
    if(token){
        axios.post('https://task-management-web1.herokuapp.com/auth', {token:token})
        .then(res=>{
            if(res.data===false){
                history.push('/login')
            }else{
                setUser(res.data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }else{history.push('/login')}
       
    }, [])
    return (
        <div>
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    )
}

export default Progress
