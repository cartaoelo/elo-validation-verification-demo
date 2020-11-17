import React from 'react'
import { BoxIconsProps } from '../../../types/boxicons'
import { FormDivStyled, FormInputStyled, FormInputIcon } from './FormInput.styled'

interface FormProps
	extends Omit<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		'ref' | 'name'
	> {
	boxIcons: BoxIconsProps
	name: string
}

const FormInput = ({ boxIcons, name, ...rest }: FormProps) => {
	return (
		<FormDivStyled>
			<FormInputStyled
				placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
				{...rest}
			/>
			<FormInputIcon>
				<box-icon {...boxIcons} color="#b3b3b3"></box-icon>
			</FormInputIcon>
		</FormDivStyled>
	)
}

export default FormInput
