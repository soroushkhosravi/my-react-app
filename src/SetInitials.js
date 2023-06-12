import { useState } from 'react';
function SetInitials(){
	const [userLoggedIn, setUserLoggedIn] = useState(null);
	const [username, setUserName] = useState(null);
	const [email, setEmail] = useState(null);
	const [jwt_token] = useState(localStorage.getItem("jwt_token"))
	const [apiRead, setApiRead] = useState(false);
	const [apiError, setApiError] = useState(null);
	const [authURL, setAuthURL] = useState(null);
	const [pageLoaded, setPageLoaded] = useState(false);
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
		pageLoaded,
		setPageLoaded,
	];
};

export { SetInitials }