import './App.css';
import {useParams, useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';

function SetJWT(){
	window.location.assign(signInURL() + signInCallbackURL());
}

function signInCallbackURL(){
	return window.location.origin + '/jwt';
}

function signInURL(){
	return process.env.REACT_APP_BACKEND_URL + '/login?next_url=';
}
function userURL(){
	return process.env.REACT_APP_BACKEND_URL + '/api/user'
}


function App(props) {
	const [renderComponent, setRenderComponent] = useState(false);
	const [username, setUserName] = useState(null);
	const [email, setEmail] = useState(null);
	const [jwt_token] = useState(localStorage.getItem("jwt_token"))

	useEffect(() => {
		async function setToken(){
			if (jwt_token === null){
				SetJWT();
			}
			else{
				const response = await fetch(
					userURL(),
					{
						method: 'GET',
						headers: {
							'Authentication': 'Bearer ' + jwt_token
						}
					}
				)
				const json_response = await response.json();
				if(json_response.message === 'user not logged in.'){
					SetJWT();
				}
				if(json_response.message === 'current user is found.'){
					const user_data = JSON.parse(json_response.user)
					setUserName(user_data.username);
					setEmail(user_data.email);
					setRenderComponent(true);
				}
			}
		};
		setToken();
	}, [jwt_token])
	if (renderComponent === true){
	    return (
			<div>
			    <h1>{process.env.REACT_APP_ENV} environment.</h1>
			    <p> The user is {username} with email {email}</p>
			    <p> This is home page.</p>
			</div>
		)
	}
}

function App2(props) {
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
	useEffect(() => { navigate("/");}, [navigate]);
}

export {App, App2, User, RequestLoader};
