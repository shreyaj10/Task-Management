import React, {useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




function Monday() {
    const [startDate, setStartDate] = useState(new Date());
    const [msg, setMsg] = useState('Incomplete')
    let history=useHistory()



    const handleClick=()=>{
        history.push('/home')
    }
    const handleChange=()=>{
        setMsg('Completed!')
    }

    return (
        <div>
           
           <DatePicker selected={startDate} onChange={(date) => {console.log(startDate) 
            setStartDate(date)}}/>
            <h1>Here are your tasks for monday</h1>
            <h3>Tasks</h3><button>
            <Link to="addTask">Click to add task</Link></button>
            <button onClick={handleChange}>{msg}</button>
            <button onClick={handleClick}>Reschedule</button>
        </div>
    )
}
export default Monday
