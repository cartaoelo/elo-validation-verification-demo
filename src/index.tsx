import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GlobalStyles } from './styles/global'
import { AppProvider } from './context/AppContext'
import 'boxicons'
import 'izitoast/dist/css/iziToast.min.css'

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<GlobalStyles />
			<App />
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
