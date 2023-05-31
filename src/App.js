import './App.css';
import {useParams, useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';

function signInCallbackURL(){
	return window.location.origin + '/jwt';
}

function userURL(){
	return process.env.REACT_APP_BACKEND_URL + '/api/user'
}
function createToken(token){
	return "Bearer " + token;
}


function App(props) {
	const [renderComponent, setRenderComponent] = useState(false);
	const [username, setUserName] = useState(null);
	const [email, setEmail] = useState(null);
	const [jwt_token] = useState(localStorage.getItem("jwt_token"))
	const [apiRead, setApiRead] = useState(false);
	const [apiError, setApiError] = useState(null);

	useEffect(() => {
		async function setToken(){
			try {
				const response = await fetch(
					userURL(),
					{
						method: 'GET',
						headers: {'Authentication': createToken(jwt_token)}
					}
				)
				const json_response = await response.json();
				if(json_response.message === 'user not logged in.'){
					window.location.assign(json_response.auth_url + '?next_url=' + signInCallbackURL());
				}
				if(json_response.message === 'current user is found.'){
					const user_data = JSON.parse(json_response.user)
					setUserName(user_data.username);
					setEmail(user_data.email);
					setRenderComponent(true);
					setApiRead(true);
				}
			} catch (error){
				setRenderComponent(true);
				setApiRead(false);
				setApiError(error.message);
			}
		}
		setToken();
	}, [jwt_token])
	if (renderComponent === true && apiRead === true){
	    return (
			<div>
				< LogOut />
			    <h1>{process.env.REACT_APP_ENV} environment.</h1>
			    <p> The user is {username} with email {email}</p>
			    <p> This is home page.</p>
			</div>
		)
	}
	if (renderComponent === true && apiRead === false){
	    return (
			<div>
				< LogOut />
			    <h1>{process.env.REACT_APP_ENV} environment.</h1>
			    <p> There was an error reading from api: {apiError}.</p>
			</div>
		)
	}
}

function SetJWT(){
	const { jwt } = useParams();
	localStorage.setItem("jwt_token", jwt)
	const navigate = useNavigate();
	useEffect(() => { navigate("/");}, [navigate]);
}

function LogOut(){
	function removeJWT(){
		localStorage.removeItem("jwt_token");
		window.location.assign(window.origin)
	}
	return (
	    <button onClick={removeJWT}>
	      Click me to log out.
	    </button>
    );
}

export {App, SetJWT, LogOut};
