import './App.css';
import {useParams, useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function signInCallbackURL(){
	return window.location.origin + '/jwt';
}

function userURL(){
	return process.env.REACT_APP_BACKEND_URL + '/api/user'
}
function createToken(token){
	return "Bearer " + token;
}

function SetInitials(){
	const [userLoggedIn, setUserLoggedIn] = useState(null);
	const [username, setUserName] = useState(null);
	const [email, setEmail] = useState(null);
	const [jwt_token] = useState(localStorage.getItem("jwt_token"))
	const [apiRead, setApiRead] = useState(false);
	const [apiError, setApiError] = useState(null);
	const [authURL, setAuthURL] = useState(null);
	return [
		userLoggedIn,
		setUserLoggedIn,
		username,
		setUserName,
		email,
		setEmail,
		jwt_token,
		apiRead,
		setApiRead,
		apiError,
		setApiError,
		authURL,
		setAuthURL,
	];
};


function App(props) {
	const [
		userLoggedIn,
		setUserLoggedIn,
		username,
		setUserName,
		email,
		setEmail,
		jwt_token,
		apiRead,
		setApiRead,
		apiError,
		setApiError,
		authURL,
		setAuthURL,
	] = SetInitials();

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
				setApiRead(true);
				if(json_response.message === 'user not logged in.'){
					setUserLoggedIn(false);
					setAuthURL(json_response.auth_url);
				}
				if(json_response.message === 'current user is found.'){
					const user_data = JSON.parse(json_response.user)
					setUserName(user_data.username);
					setEmail(user_data.email);
					setUserLoggedIn(true);
				}
			} catch (error){
				setApiRead(false);
				setApiError(error.message);
			}
		}
		setToken();
	}, [jwt_token, setApiError, setApiRead, setEmail, setUserName, setUserLoggedIn, setAuthURL])
	if (apiRead === false){
		return(
			<div>
				<p>Application not available because of: {apiError}</p>
			</div>
		)
	} else if (userLoggedIn === true){
		return (
			<div>
				< LogOut />
			    <h1>{process.env.REACT_APP_ENV} environment.</h1>
			    <p> The user is {username} with email {email}</p>
			    <p> This is home page.</p>
			</div>
		)
	} else if( userLoggedIn === false ){
		return(
			<div>
			 < LogIn auth_url={authURL} />
			</div>
		)
	}
}

function CompleteApp(){
  return(
    <BrowserRouter>
		<Routes>
            <Route path="/" element={< App name="App" names={["soroush", "farnaz"]} users={[10, 12]} />} />
			<Route path="/jwt/:jwt" element={< SetJWT />} />
			<Route path="/logout" element={< LogOut />} />
        </Routes>
	</BrowserRouter>
  )
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
		window.location.assign(window.origin);
	}
	return (<button className="btn btn-danger" onClick={removeJWT}>Log out</button>);
}

function LogIn(props){
	function redirectToLogInPage(){
		window.location.assign(props.auth_url + '?next_url=' + signInCallbackURL());
	}
	return (<button className="btn btn-primary" onClick={redirectToLogInPage}> Log In </button>);
}

export {App, SetJWT, LogOut, CompleteApp};
