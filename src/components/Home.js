import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Task Manager</h1>
            <h3>Click To view your tasks</h3>
            <button><Link to="/createTask"> Add a </Link>Task</button><br></br>
            <button><Link to='/monday'>Monday</Link></button>
        </div>
    )
}

export default Home
