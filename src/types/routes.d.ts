import React from 'react'

export interface PrivateProps {
	exact?: boolean
	path: string
	component: React.FC
}
