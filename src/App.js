import './App.css';
import {Link } from "react-router-dom";
function App(props) {
      return (
        <div>
	        <h1> We are in {process.env.REACT_APP_ENV}.</h1>
	        <p> This is app name: {props.name[1]}</p>
	        <Link to="app2" target="_blank">Click to open HereWeCode (new tab)</Link>
        </div>
      )
}

function App2(props) {
      return (
        <div>
	        <h1> We are in {props.name} now.</h1>
        </div>
      )
}

export {App, App2};
