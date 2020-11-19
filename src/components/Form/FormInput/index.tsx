import React, { forwardRef } from 'react'
import { FormProp } from '../../../types/form'
import { FormDivStyled, FormInputStyled, FormInputIcon } from './FormInput.styled'

const FormInput = forwardRef<any, FormProp>(function FormInput(
	{ name, mask, boxIcons, ...rest },
	ref
) {
	return (
		<FormDivStyled>
			<FormInputStyled
				placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
				inputRef={ref}
				mask={mask}
				name={name}
				{...rest}
			/>
			<FormInputIcon>
				<box-icon {...boxIcons} color="#b3b3b3"></box-icon>
			</FormInputIcon>
		</FormDivStyled>
	)
})

export default FormInput
