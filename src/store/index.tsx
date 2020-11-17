import { createContext } from 'react'

import { ContextTypes } from '../types/context'

export const AppContextDefaultValue: ContextTypes = {
	access_token: localStorage.getItem('accessToken'),
	sensitive: ''
}

const AppContext = createContext(AppContextDefaultValue)

export default AppContext
