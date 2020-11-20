import styled from 'styled-components'

export const RadioContainerStyled = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 10px;

	h3 {
		font-size: 18px;
		color: #686868;
	}
`

export const RadioDivStyled = styled.div`
	display: flex;
	justify-content: space-evenly;
`

export const RadioInputStyled = styled.input`
	display: none;
	position: relative;
	cursor: pointer;
	line-height: 20px;
	font-size: 14px;
	margin: 15px;
	&:hover {
		.label:after {
			transform: scale(3.6);
		}
	}

	&:checked + .label {
		border-color: #00a4e0;
		&:after {
			transform: scale(1);
			transition: all 0.2s cubic-bezier(0.35, 0.9, 0.4, 0.9);
			opacity: 1;
		}
	}
`

export const RadioLabelStyled = styled.label`
	position: relative;
	cursor: pointer;
	line-height: 20px;
	font-size: 14px;
	margin: 15px;

	.option {
		color: #686868;
		font-size: 14px;
		font-weight: 500;
	}
`

export const RadioTextStyled = styled.span`
	position: relative;
	display: block;
	float: left;
	margin-right: 10px;
	width: 20px;
	height: 20px;
	border: 2px solid #c8ccd4;
	border-radius: 100%;
	-webkit-tap-highlight-color: transparent;
	&:after {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background: #00a4e0;
		transform: scale(0);
		transition: all 0.2s ease;
		opacity: 0.08;
		pointer-events: none;
	}
`
