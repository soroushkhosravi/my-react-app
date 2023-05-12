import './App.css';

function App() {
      if (process.env.NODE_ENV === "development"){
        return (
          <div className="App">
            <p>We are in dev environment.</p>
            <h1> This is a header. </h1>
            <p>This is an env variable: {process.env.REACT_APP_ENV_VARIABLE}</p>
            <p>This is an env variable: {process.env.REACT_APP_SECOND_ENV_VARIABLE}</p>
          </div>
        );
      };
      return (
        <h1> We are in prod or test environment.</h1>
      )
}

function App2() {
	return (
		<p> This is made manually by the user.</p>
	);
}

export {App, App2};
