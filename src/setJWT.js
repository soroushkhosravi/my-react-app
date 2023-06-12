import {useNavigate, useParams} from "react-router-dom";
import { useEffect} from 'react';
function SetJWT(){
	const { jwt } = useParams();
	localStorage.setItem("jwt_token", jwt)
	const navigate = useNavigate();
	useEffect(() => { navigate("/");}, [navigate]);
}

export { SetJWT }