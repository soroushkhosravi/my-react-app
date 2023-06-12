function signInCallbackURL(){
	return window.location.origin + '/jwt';
}

function LogIn(props){
	function redirectToLogInPage(){
		window.location.assign(props.auth_url + '?next_url=' + signInCallbackURL());
	}
	return (<button className="btn btn-primary" onClick={redirectToLogInPage}> Log In </button>);
}

export { LogIn }