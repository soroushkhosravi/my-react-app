import './App.css';

function App() {
      return (
        <div>
	        <h1> We are in {process.env.REACT_APP_ENV}.</h1>
	        <p>Hello should be deleted.</p>
	        <p> This is prod env variable animal: {process.env.REACT_APP_CREATURE}</p>
        </div>
      )
}

function App2() {
	return (
		<p> This is made manually by the user.</p>
	);
}

export {App, App2};
