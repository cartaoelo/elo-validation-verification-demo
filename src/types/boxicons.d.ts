import React from 'react'

export interface BoxIconsProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	type?: 'regular' | 'solid' | 'logo'
	name: string
	color?: string
	size?: 'xs' | 'sm' | 'md' | 'lg' | string
	rotate?: number
	flip?: 'horizontal' | 'vertical'
	border?: 'square' | 'circle'
	animation?:
		| 'spin'
		| 'tada'
		| 'flashing'
		| 'burst'
		| 'fade-left'
		| 'fade-right'
		| 'spin-hover'
		| 'tada-hover'
		| 'flashing-hover'
		| 'burst-hover'
		| 'fade-left-hover'
		| 'fade-right-hover'
	pull?: 'left' | 'right'
}
