import './App.css';
import {useParams, useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate,  Link} from "react-router-dom";
import { LogOut } from './LogOut';
import { LogIn } from './LogIn';
import { SetJWT } from './setJWT';
import { Address } from './Address';
import { AddressButton } from './AddressButton';
import { SetInitials } from './SetInitials';
import { ProtectedRoute } from './ProtectedRoute'
import { createToken, userURL, UnauthorisedUserMessage } from './helpers.js'

function App() {
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
				if(json_response.message === UnauthorisedUserMessage){
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
	if (pageLoaded === false){
		return(
		  <div>Page loading.</div>
		)
	}
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
				< AddressButton />
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
            <Route path="/" element={< App />} />
            <Route path="/address" element={
                <ProtectedRoute>
                    <Address/>
                </ProtectedRoute>
            } ></Route>
			<Route path="/jwt/:jwt" element={< SetJWT />} />
			<Route path="/logout" element={< LogOut />} />
        </Routes>
	</BrowserRouter>
  )
}

export {App, SetJWT, LogOut, CompleteApp, ProtectedRoute, Address, AddressButton};
