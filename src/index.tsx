/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GlobalStyles } from './styles/global'
import 'boxicons'
import 'izitoast/dist/css/iziToast.min.css'

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyles />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
