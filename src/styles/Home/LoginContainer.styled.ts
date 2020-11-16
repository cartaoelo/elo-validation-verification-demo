import styled from 'styled-components'

const LoginContainerStyled = styled.div`
	padding: 77px 30px 50px;
	background-color: #fff;
	border-radius: 5px;
	width: 450px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	h1 {
		font-size: 30px;
		text-align: center;
		margin-bottom: 55px;
	}

	@media only screen and (max-width: 1200px) {
		width: auto;
	}
`

export default LoginContainerStyled
