import './App.css';
import {Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';

function JWTMissed(){
	return localStorage.getItem("jwt_token") === null
}
function SetJWT(){
	console.log(window.location.origin)
	window.location.assign('http://127.0.0.1/login?next_url=' + window.location.origin + '/jwt');
	return
}

function needsJWTSet(){
	let needsJWT = false;
	if (JWTMissed()){
		SetJWT();
		needsJWT = true;
	}
	return needsJWT;
}

function App(props) {
	  const names = props.names;
	  const users = props.users;
	  if (needsJWTSet()){
	    return
	  }
      return (
        <div>
	        <h1>{process.env.REACT_APP_ENV} environment.</h1>
	        <p> This is home page.</p>
        </div>
      )
}

function App2(props) {
	  if (needsJWTSet()){
	    return
	  }
      return (
        <div>
	        <p> We are in {props.name} now.</p>
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

function RequestLoader(){
	const { jwt } = useParams();
	localStorage.setItem("jwt_token", jwt)
	const navigate = useNavigate();
	let jwtSaved = true;
	useEffect(() => {
    if (jwtSaved) {
      navigate("/");
    }
  }, [jwtSaved]);
}

export {App, App2, User, RequestLoader};
