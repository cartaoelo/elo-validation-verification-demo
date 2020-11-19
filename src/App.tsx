import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import { HOME, ADDCARD, VALIDATECPF } from './constants/routes'

import Home from './pages/Home'
import AppContext, { AppContextDefaultValue } from './store'

import AppStyled from './styles/App.styled'
import BackgroundContainerStyled from './styles/Background'
import AddCard from './pages/AddCard'
import ValidateCPF from './pages/ValidateCPF'

function App() {
	return (
		<AppContext.Provider value={AppContextDefaultValue}>
			<AppStyled className="App">
				<Router>
					<Switch>
						<BackgroundContainerStyled>
							<Route exact component={Home} path={HOME} />
							<PrivateRoute exact component={AddCard} path={ADDCARD} />
							<PrivateRoute exact component={ValidateCPF} path={VALIDATECPF} />
							<Route component={() => <Redirect to={HOME} />} />
						</BackgroundContainerStyled>
					</Switch>
				</Router>
			</AppStyled>
		</AppContext.Provider>
	)
}

export default App
