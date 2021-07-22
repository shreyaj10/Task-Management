import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Completed() {
    let history=useHistory()
    const [user, setUser] = useState({
        username:'',
        email:"",
        password:"",
        _id:""
        
      })
       
        
      const [tasks, setTasks] = useState([{
            username:"",
            title:"",
            desc:"",
            _id:"",
            status:"",
    
    
    }])
    useEffect(() => {
        fetch('./tasks').then(res=>{
            if (res.ok){
                return res.json()
            }
        }).then(jsonRes=>setTasks(jsonRes));
        
    
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
  },[])
    
      
        return(
            <div className="tasks">
                 {tasks.map(task=>{
                      if(task.username===user.username && task.status==="completed!" || task.status==="completed late" ){
                          return(
                            <div className="task">
                            <h4 className="title">{task.title}</h4>
                            <h6 className="desc">{task.desc}</h6>
                           
                            </div>
                          )
                      }})}
            </div>
        )}
      

export default Completed
