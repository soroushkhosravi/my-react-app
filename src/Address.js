import { useState, useEffect} from 'react';
import { createToken } from './helpers';
import { BrowserRouter, Routes, Route, Navigate,  Link} from "react-router-dom";;

function Address(){
	const [postCode, setPostCode] = useState('');
	const [invalidToken, setInvalidToken] = useState(false);
	const [addressData, setAddressData] = useState({});
    const handleSubmit = (event) => {
	    event.preventDefault();
	    getAddressData();
    };

	const getAddressData = async function(){
		const response = await fetch(
		process.env.REACT_APP_BACKEND_URL + "/api/addresses",
			{
				method: 'POST',
				headers: {
					'Authentication': createToken(localStorage.getItem("jwt_token")),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({'post_code': postCode})
			}
		)
		const json_response = await response.json();
		if (json_response.message === 'user not logged in.'){
			setInvalidToken(true);
			return
		}
		setAddressData(json_response);
	}
	if (invalidToken === true){
		return <Navigate to='/' />;
	}
	return(
		<>
			<h1>Address investigation.</h1>
			<form onSubmit={handleSubmit} >
				Post Code:
				<input
					type="text"
					id="postCode"
					name="postCode"
					value={postCode}
					placeholder="Post Code"
					onChange={
						(event) => {setPostCode(event.target.value);}
                    }
				/>
				<input type="submit" value="Submit" className="btn btn-primary" />
			</form>
			{"crimes" in addressData && (
				 Object.entries(addressData.crimes).map((t,k) => <div key={t[0]}> {t[0]}: {t[1]}</div>)
				 )
			}
		</>
	)
}

export { Address }