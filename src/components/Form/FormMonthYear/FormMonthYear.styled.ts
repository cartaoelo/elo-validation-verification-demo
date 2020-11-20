import styled from 'styled-components'

const FormMonthYearStyled = styled.div`
	display: flex;
	width: 100%;
	div:last-child {
		margin-left: 3%;
	}

	@media only screen and (max-width: 600px) {
		flex-direction: column;
		div:last-child {
			margin-left: 0;
		}
	}
`

export default FormMonthYearStyled
