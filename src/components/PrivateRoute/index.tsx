import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { HOME } from '../../constants/routes'
import AppContext from '../../store'

import { PrivateProps } from '../../types/routes'

const PrivateRoute: React.FC<PrivateProps> = ({ component, path, exact }) => {
	const { access_token } = useContext(AppContext)
	console.log('[access_token]', access_token)
	return (
		<Route
			render={() =>
				access_token !== null ? (
					<Route path={path} exact={exact} component={component} />
				) : (
					<Redirect to={HOME} />
				)
			}
		/>
	)
}

export default PrivateRoute
