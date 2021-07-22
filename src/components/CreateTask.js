import React ,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'
import "react-datepicker/dist/react-datepicker.css"

function CreateTask() {
    let history=useHistory()
    const [prior, setprior] = useState("high")
    const [value, setValue] = useState("10:00")
    const [startDate, setStartDate] = useState(new Date())
    const [user, setUser] = useState()
    const [input, setInput] = useState([{
        title:"",
        desc:"",
    }])

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })

    }
    useEffect(() => {
        let token=localStorage.getItem("token")
        if (token){
            axios.post("http://localhost:3001/auth", {token:token})
            .then(res=>{
                if(res.data===false){
                    history.push("/login")
                }else{
                    setUser(res.data)
                }
            }).catch(err=>{
                console.log(err)
            })
        }else{
            history.push('/login')
        }
        
    }, [])
    function handleClick(event) {
        event.preventDefault();
        let time1= value.split(":")
        let timestamp_hours=time1[0]*3600*1000
        let timestamp_minutes=time1[1]*60*1000
        let final_time=startDate+timestamp_hours+timestamp_minutes

        const newTask = {
            username:user.username,
            title: input.title,
            desc: input.desc,
            timeDue:final_time,
            priority:prior

        }
        console.log(newTask)
        axios.post("http://localhost:3001/createTask", newTask)
        .then(result => {
            console.log("done");
        })
        .catch(error => {
            console.log(error);
        });
        history.push('/tasks')
    }
        const handleChange1=(e)=>{
            setprior(e.target.value)

        }
    return (
        <div className="createPost">
            <form className="container1" >
            <h2 className="createAPost">Add a task</h2>
              <div id="title5">
                  <label form="title"></label>
                  <input type="text" name="title" placeholder="What do you want to do?" id="title1" onChange={handleChange}/>
              </div>
              <div id="content5">
                  <label form="desc"></label>
                  <textarea name="desc" id="content1" cols="30" rows="10"  placeholder="Additional Details about the task" onChange={handleChange}></textarea>
              </div>
              <div>
                  <DatePicker selected={startDate} onChange={(date)=>{
                      let hours=date.getHours()
                      let minutes=date.getMinutes()
                      let seconds=date.getSeconds()
                      let milliseconds=date.getMilliseconds()
                      let time=date.getTime()
                      let date_Date=time-(hours*3600*1000)-(minutes*60*1000)-(seconds*1000)-(milliseconds)
                      setStartDate(date_Date)
                  }}/>
              </div>
              <div>
                  <TimePicker onChange={(time)=>{
                      setValue(time)
                  }}
                  value={value}/>
              </div>
              <div>
                  <select onChange={handleChange1} value={prior}>
                      <option value="high">High</option>
                      <option value="moderate">Moderate</option>
                      <option value="low">Low</option>
                  </select>
              </div>
              <button onClick={handleClick} id="postBtn">Submit</button>
            </form>
        </div>
    )
}

export default CreateTask
