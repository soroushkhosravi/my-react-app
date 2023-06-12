function LogOut(){
	function removeJWT(){
		localStorage.removeItem("jwt_token");
		window.location.assign(window.origin);
	}
	return (<button className="btn btn-danger" onClick={removeJWT}>Log out</button>);
}

export { LogOut }