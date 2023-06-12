import { useState, useEffect} from 'react';
import { createToken } from './helpers'

function Address(){
	const [postCode, setPostCode] = useState('');
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
	setAddressData(json_response);
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
			<div>{JSON.stringify(addressData.crimes)}</div>
		</>
	)
}

export { Address }