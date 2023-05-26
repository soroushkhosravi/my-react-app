import './App.css';
import {Link } from "react-router-dom";
function App(props) {

	  const names = props.names;
      return (
        <div>
	        <h1> We are in {process.env.REACT_APP_ENV}.</h1>
	        <p> This is app name: {props.name}</p>
	        {
	            names.map(
	                (name) => (<ul><li><Link to="app2" target="_blank">Click here to see App2 component.</Link></li></ul>)
	            )
	        }
        </div>
      )
}

function App2(props) {
      return (
        <div>
	        <p1> We are in {props.name} now.</p1>
        </div>
      )
}

export {App, App2};
