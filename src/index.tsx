/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GlobalStyles } from './styles/global'
import 'boxicons'

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyles />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
