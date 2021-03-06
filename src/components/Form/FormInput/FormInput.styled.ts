import MaskedInput from 'react-input-mask'
import styled from 'styled-components'

export const FormDivStyled = styled.div`
	position: relative;
	width: 100%;
	margin-bottom: 16px;
`

export const FormInputStyled = styled(MaskedInput)`
	width: 100%;
	font-size: 18px;
	color: #686868;
	display: block;
	background-color: #e6e6e6;
	height: 62px;
	border-radius: 5px;
	padding: 0 30px 0 65px;

	&:focus {
		border: 0.5px solid #686868;
	}
`

export const FormInputIcon = styled.span`
	color: #999;
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 0;
	left: 0;
	padding-left: 23px;
	padding-bottom: 19px;
	transition: all 0.4s;
`
