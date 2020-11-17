import styled from 'styled-components'

const ValidateCPFContainerStyled = styled.div`
	padding: 60px 70px 50px;
	background-color: #fff;
	border-radius: 5px;
	width: 450px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	animation: ${({ out }: { out: boolean }) => out && '.5s ease-out 1 slideToTop'};

	h1 {
		font-size: 25px;
		text-align: center;
		margin-bottom: 10px;
	}

	h3 {
		font-size: 16px;
		color: #b2b2b2;
		text-align: center;
		margin-bottom: 40px;
	}

	@media only screen and (max-width: 1200px) {
		width: auto;
	}

	@keyframes slideToTop {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-10%);
		}
	}
`

export default ValidateCPFContainerStyled
