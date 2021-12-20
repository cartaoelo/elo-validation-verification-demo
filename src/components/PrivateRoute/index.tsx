import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { HOME } from '../../constants/routes'
import { useAppContext } from '../../context/AppContext'

import { PrivateProps } from '../../types/routes'

const PrivateRoute: React.FC<PrivateProps> = ({ component, path, exact }) => {
	const {
		appContextState: { access_token }
	} = useAppContext()
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
