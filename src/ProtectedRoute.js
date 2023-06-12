import { Navigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import { SetInitials } from './SetInitials';

function userURL(){
	return process.env.REACT_APP_BACKEND_URL + '/api/user'
}
function createToken(token){
	return "Bearer " + token;
}

const ProtectedRoute = ({children}) => {
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
		pageLoaded,
		setPageLoaded
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
				setPageLoaded(true);
			} catch (error){
			    setPageLoaded(true);
				setApiRead(false);
				setApiError(error.message);
			}
		}
		setToken();
	}, [jwt_token, setApiError, setApiRead, setEmail, setUserName, setUserLoggedIn, setAuthURL, setPageLoaded])
	if (apiRead === true & userLoggedIn === true){
		return children
	} else if (pageLoaded === true){
		return <Navigate to='/' />;
	}
};

export { ProtectedRoute }