import './App.css';
import {Link, useParams} from "react-router-dom";
import { useState } from 'react';
function App(props) {

	  const names = props.names;
	  const users = props.users;
      return (
        <div>
	        <h1> We are in {process.env.REACT_APP_ENV}.</h1>
	        <p> This is app name: {props.name}</p>
	        {
	            names.map(
	                (name) => (<ul><li><Link to="app2" target="_blank">Click here to see App2 component.</Link></li></ul>)
	            )
	        }
	        {
	            users.map(
	                (user) => (<ul><li><Link to={"user/" + user} target="_blank">Click here to see user with id: {user}.</Link></li></ul>)
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

function User(props) {
	  const { id } = useParams();
	  const [name, setName] = useState("Soroush");

	  let changeName = function(){
	    if (name === "Soroush"){
	        setName("Farnaz");
	    };
	    if (name === "Farnaz"){
	        setName("Soroush");
	    };
	  }

	  let buttonMessage = function(){
	    if (name === "Farnaz"){
	        return "Change name to Soroush."
	    }
	    if (name === "Soroush"){
	        return "Change name to Farnaz."
	    }
	  }

      return (
        <div>
	        <p> We are in user page: {id} and user name: {name}</p>
	        <br />
	        <button onClick={e => {changeName();}}>{buttonMessage()}</button>
        </div>
      )
}

export {App, App2, User};
