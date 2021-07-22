import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Tasks() {
  let history=useHistory()
  const [msg, setmsg] = useState("Complete")
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
])
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
        status:""


}])
    useEffect(() => {
        fetch('./tasks').then(res=>{
            if (res.ok){
                return res.json()
            }
        }).then(jsonRes=>setTasks(jsonRes));
        
    
    let token=localStorage.getItem('token');
    if(token){
        axios.post('./auth', {token:token})
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


const handleDelete=(task)=>{
  let comObj={
    id:task._id
  }
  axios.post("htpp://localhost:3001/delete", comObj)
  .then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
}


const handleClick=(task)=>{
  let comObj={
    id:task._id
  }
  setmsg("completed!")
  axios.post("http://localhost:3001/complete", comObj)
  .then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})
history.push("/completed")
}

   
           return(
             <div>
                <div>
            <div>
             <h1>Task Manager</h1>
           <div>
              <div className="tasks">
              <button className="button"><Link to="/createTask"> Add a Task</Link></button>
                <button className="button"><Link to='/completed'>Completed Tasks</Link></button>
            <h3 id="name">{user.username}'s tasks are:</h3>

            {tasks.map(task=>{
                let date=new Date(task.timeDue).getDate()
                let month= months[new Date(task.timeDue).getMonth()]
                let year=new Date(task.timeDue).getFullYear()
                let hours=new Date(task.timeDue).getHours()
                let minutes=new Date(task.timeDue).getMinutes()
                function timeSince(date) {

                    var seconds = Math.floor((task.timeDue- date) / 1000);
                  
                    var interval = seconds / 31536000;
                  
                    if (interval > 1) {
                      return Math.floor(interval) + " years";
                    }
                    interval = seconds / 2592000;
                    if (interval > 1) {
                      return Math.floor(interval) + " months";
                    }
                    interval = seconds / 86400;
                    if (interval > 1) {
                      return Math.floor(interval) + " days";
                    }
                    interval = seconds / 3600;
                    if (interval > 1) {
                      return Math.floor(interval) + " hours";
                    }
                    interval = seconds / 60;
                    if (interval > 1) {
                      return Math.floor(interval) + " minutes";
                    }
                    return Math.floor(seconds) + " seconds";
                  }
                  if(task.username===user.username && task.status==="assigned" ){
                return(
                  <div className="format">
                <div className="task">

                 <div className="title">{task.title}</div>
                <div className="desc">{task.desc}</div>
               <div className="timestamp">
                   Due on {date} {month} {year} at {hours}:{minutes}</div>
               
               <div className="date">
                    Due in {timeSince(Date.now())}</div>
               
               <div className="priority">
                 priority:{task.priority}</div>
               
                  <button onClick={()=>{handleClick(task)}}>{msg}</button>
                  <button onClick={()=>{handleDelete(task)}}><Link to={{pathname:"/reschedule", state:{title:task.title, desc:task.desc}}}>Reschedule</Link></button>
                </div>
                </div>
                )}
            }) }</div>
            <div className="links">
            {/* <button className="button"><Link to="/createTask"> Add a Task</Link></button> */}
                {/* <button className="button"><Link to='/completed'>Completed Tasks</Link></button> */}
                </div>
            
            </div></div>
        </div>
        </div>
             
           )
            
         
    
}

export default Tasks


