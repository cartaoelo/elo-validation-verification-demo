import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { HOME, VALIDATE, VERIFY } from './constants/routes'

import Home from './pages/Home'
import Validate from './pages/Validate'
import Verify from './pages/Verify'
import AppContext, { AppContextDefaultValue } from './store'

function App() {
	return (
		<AppContext.Provider value={AppContextDefaultValue}>
			<div className="App">
				<Router>
					<Switch>
						<Route exact component={Home} path={HOME} />
						<Route exact component={Verify} path={VERIFY} />
						<Route exact component={Validate} path={VALIDATE} />
						<Route path="/*" component={() => <Redirect to={HOME} />} />
					</Switch>
				</Router>
			</div>
		</AppContext.Provider>
	)
}

export default App
