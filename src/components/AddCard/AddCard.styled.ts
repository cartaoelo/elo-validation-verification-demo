import styled from 'styled-components'

const AddCardStyled = styled.div`
	padding: 77px 30px 50px;
	background-color: #fff;
	border-radius: 5px;
	width: 450px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	animation: 1s ease-out 1 slideFromBottom;

	h1 {
		font-size: 30px;
		text-align: center;
		margin-bottom: 55px;
	}

	@media only screen and (max-width: 768px) {
		width: 80%;
	}

	@keyframes slideFromBottom {
		0% {
			opacity: 0;
			transform: translateY(10%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
`

export default AddCardStyled
