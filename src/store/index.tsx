import { createContext } from 'react'

import { ContextTypes } from '../types/context'

export const AppContextDefaultValue: ContextTypes = {
	access_token: '',
	sensitive: ''
}

AppContextDefaultValue.access_token = localStorage.getItem('accessToken')

const AppContext = createContext(AppContextDefaultValue)

export default AppContext
