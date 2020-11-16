import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import { HOME, VALIDATE, VERIFY } from './constants/routes'

import Home from './pages/Home'
import Validate from './pages/Validate'
import Verify from './pages/Verify'
import AppContext, { AppContextDefaultValue } from './store'

import AppStyled from './styles/App.styled'

function App() {
	return (
		<AppContext.Provider value={AppContextDefaultValue}>
			<AppStyled className="App">
				<Router>
					<Switch>
						<Route exact component={Home} path={HOME} />
						<PrivateRoute exact component={Verify} path={VERIFY} />
						<PrivateRoute exact component={Validate} path={VALIDATE} />
						<Route path="/*" component={() => <Redirect to={HOME} />} />
					</Switch>
				</Router>
			</AppStyled>
		</AppContext.Provider>
	)
}

export default App
