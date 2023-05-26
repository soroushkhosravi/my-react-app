import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, App2} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
            <Route path="/" element={<App name={["App", "Ass"]} />} />
            <Route path="/app2" element={<App2 name="App2"/>} />
        </Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
