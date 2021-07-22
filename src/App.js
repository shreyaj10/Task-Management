import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import Tasks from './components/Tasks';
import Completed from './components/Completed';
import Reschedule from './components/Reschedule';
import Progress from './components/Progress';
import "./components/comp.css"

function App() {
  return (
    
    <Router>
    
      <Route path='/home'>
        <Home/>
      </Route>

     
      <Route path='/completed'>
        <Completed/>
      </Route>

     
      <Route path='/reschedule'>
        <Reschedule/>
      </Route>
    
      <Route path='/createTask' exact>
       <CreateTask/>
      </Route>

      <Route path='/tasks'>
        <Tasks />
      </Route>

      <Route path='/progress'>
        <Progress/>
      </Route>


      <Route path='/' exact>
        <SignUp/>
      </Route>

      <Route path='/login'>
        <Login/>
      </Route>

     
    </Router>
  )
    
}

export default App;