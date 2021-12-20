import React, { createContext, Dispatch, SetStateAction, useContext } from 'react'
import usePersistedState from '../hooks/usePersistedState'

interface IState {
	access_token: string
	cpf: string
}
const defaultValue = {
	access_token: '',
	cpf: ''
}

type ContextValue = {
	appContextState: IState
	setAppContextState: (value: IState) => void
}

const AppContext = createContext<ContextValue | undefined>(void 0)

const AppProvider = ({ children }: any) => {
	const [appContextState, setAppContextState] = usePersistedState<IState>(
		'appContext',
		defaultValue
	)

	return (
		<AppContext.Provider
			value={{
				appContextState,
				setAppContextState
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

const useAppContext = () => {
	const context = useContext(AppContext)

	if (typeof context === 'undefined') {
		throw new Error('useAppContext must be used within an AppContext')
	}

	return context
}

export { AppContext, AppProvider, useAppContext }
