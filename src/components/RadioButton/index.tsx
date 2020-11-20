import React, { forwardRef } from 'react'

import { RadioLabelStyled, RadioInputStyled, RadioTextStyled } from './RadioButton.styled'

import { RadioProp } from '../../types/form'

const RadioButton = forwardRef<any, RadioProp>(function RadioButton(
	{ option, optionValue, ...rest },
	ref
) {
	return (
		<RadioLabelStyled>
			<RadioInputStyled type="radio" value={optionValue} {...rest} ref={ref} />
			<RadioTextStyled className="label" />
			<span className="option">{option}</span>
		</RadioLabelStyled>
	)
})

export default RadioButton
