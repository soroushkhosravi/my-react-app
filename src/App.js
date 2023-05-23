import './App.css';

function App() {
      if (process.env.NODE_ENV === "development"){
        return (
          <div className="App">
            <p>We are in dev environment.</p>
            <h1> This is a header. </h1>
            <p>This is an env variable: {process.env.REACT_APP_ENV_VARIABLE}</p>
            <p> This is {process.env.NODE_ENV} env variable: {process.env.REACT_APP_CREATURE}</p>
            <p>This is an env variable: {process.env.REACT_APP_SECOND_ENV_VARIABLE}</p>
          </div>
        );
      };
      if (process.env.NODE_ENV === "staging"){
        return (
          <div className="App">
            <p>We are in dev environment.</p>
            <h1> This is a header. </h1>
            <p>This is an env variable: {process.env.REACT_APP_ENV_VARIABLE}</p>
            <p> This is {process.env.NODE_ENV} env variable: {process.env.REACT_APP_CREATURE}</p>
            <p>This is an env variable: {process.env.REACT_APP_SECOND_ENV_VARIABLE}</p>
          </div>
        );
      };
      return (
        <div>
        <h1> We are in prod or test environment.</h1>
        <p> This is prod env variable: {process.env.REACT_APP_CREATURE}</p>
        </div>
      )
}

function App2() {
	return (
		<p> This is made manually by the user.</p>
	);
}

export {App, App2};
