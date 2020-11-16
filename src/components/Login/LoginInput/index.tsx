import React from 'react'
import { BoxIconsProps } from '../../../types/boxicons'
import { LoginDivStyled, LoginInputStyled, LoginInputIcon } from './LoginInput.styled'

interface LoginProps
	extends Omit<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		'ref' | 'name'
	> {
	boxIcons: BoxIconsProps
	name: string
}

const LoginInput = ({ boxIcons, name, ...rest }: LoginProps) => {
	return (
		<LoginDivStyled>
			<LoginInputStyled
				placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
				{...rest}
			/>
			<LoginInputIcon>
				<box-icon {...boxIcons} color="#b3b3b3"></box-icon>
			</LoginInputIcon>
		</LoginDivStyled>
	)
}

export default LoginInput
