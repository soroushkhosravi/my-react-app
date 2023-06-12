import {Link} from "react-router-dom";
function AddressButton(){
	return(
		<Link to="/address">
			<button className="btn btn-danger" type="button">Address investigation</button>
		</Link>
	)
}

export { AddressButton }