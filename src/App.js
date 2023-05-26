import './App.css';

function App() {
      return (
        <div>
	        <h1> We are in {process.env.REACT_APP_ENV}.</h1>
	        <p>This part is not changed.</p>
	        <p> This is prod env variable animal: {process.env.REACT_APP_CREATURE}</p>
        </div>
      )
}

export default App;
