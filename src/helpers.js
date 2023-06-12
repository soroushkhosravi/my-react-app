function userURL(){
	return process.env.REACT_APP_BACKEND_URL + '/api/user'
}
function createToken(token){
	return "Bearer " + token;
}

const UnauthorisedUserMessage = 'user not logged in.'

export { createToken, userURL, UnauthorisedUserMessage }