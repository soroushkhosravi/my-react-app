function Address(){
	return(
		<>
			<h1>Address investigation.</h1>
			<form >
				<label>
				Post Code:
				<input type="text"/>
				</label>
				<input type="submit" value="Submit" className="btn btn-primary" />
			</form>
		</>
	)
}

export { Address }