import styled from 'styled-components'

export const LoginButtonStyled = styled.button`
	font-size: 16px;
	width: 100%;
	height: 62px;
	border-radius: 5px;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.4s;
	background-color: #5c5b5a;
	color: #fafafa;
	cursor: pointer;
	font-weight: 600;

	&:hover {
		background-color: #6b6b6b;
	}

	&:active {
		border: none !important;
		background-color: #333;
	}
`
