import styled from 'styled-components'

const AppStyled = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(-135deg, #00a4e0, #ffcb05);

	@media only screen and (max-width: 600px) {
		height: 100%;
		width: 100%;
	}
`

export default AppStyled
