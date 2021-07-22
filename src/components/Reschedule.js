import React ,{useState, useEffect} from 'react'
import { useHistory , useLocation} from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'
import "react-datepicker/dist/react-datepicker.css"

function Reschedule() {
    let location=useLocation()
    let history=useHistory()
    const [prior, setprior] = useState("high")
    const [value, setValue] = useState("10:00")
    const [startDate, setStartDate] = useState(new Date())
    const [user, setUser] = useState()
    const [input, setInput] = useState([{
        title:location.state.title,
        desc: location.state.desc,
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
            axios.post("https://task-management-web1.herokuapp.com/auth", {token:token})
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
            title: location.state.title,
            desc: location.state.desc,
            timeDue:final_time,
            priority:prior

        }
        console.log(newTask)
        axios.post("https://task-management-web1.herokuapp.com/createTask", newTask)
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
        <div className="container1">
            <h2 className="createAPost">Reschedule this task</h2>
            <form >
              <div>
                  {location.state.title}
              </div>
              <div>
                  {location.state.desc}
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
              <button onClick={handleClick}>Submit</button>
            </form>
        </div>
        </div>
    )
}

export default Reschedule