import {useNavigate} from "react-router-dom";
import { useEffect} from 'react';

function LogOut(){
	function removeJWT(){
		localStorage.removeItem("jwt_token");
		window.location.assign(window.origin);
	}
	removeJWT();
	const navigate = useNavigate();
	useEffect(() => { navigate("/");}, [navigate]);
}

export { LogOut }