import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import { HOME, ADDCARD, VALIDATECPF } from './constants/routes'

import Home from './pages/Home'

import AppStyled from './styles/App.styled'
import BackgroundContainerStyled from './styles/Background'
import AddCard from './pages/AddCard'
import ValidateCPF from './pages/ValidateCPF'

function App() {
	return (
		<AppStyled className="App">
			<Router>
				<Switch>
					<BackgroundContainerStyled>
						<Route exact component={Home} path={HOME} />
						<PrivateRoute exact component={ValidateCPF} path={VALIDATECPF} />
						<PrivateRoute exact component={AddCard} path={ADDCARD} />
					</BackgroundContainerStyled>
				</Switch>
			</Router>
		</AppStyled>
	)
}

export default App
