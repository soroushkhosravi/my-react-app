import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, App2, User, RequestLoader} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
            <Route path="/" element={<App name="App" names={["soroush", "farnaz"]} users={[10, 12]} />} />
            <Route path="/app2" element={<App2 name="App2"/>} />
            <Route path="/user/:id" element={<User/>} />
			<Route path="/jwt/:jwt" element={<RequestLoader />} />
        </Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
