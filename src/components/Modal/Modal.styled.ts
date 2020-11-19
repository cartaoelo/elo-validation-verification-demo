import styled from 'styled-components'

export const ModalStyled = styled.div`
	display: ${({ show }: { show: boolean }) => (show ? 'flex' : 'none')};
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	justify-content: center;
	animation: ${({ show }: { show: boolean }) => show && 'FadeIn .4s 1 ease-out'};

	@keyframes FadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`

export const ModalContentStyled = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fefefe;
	border: 1px solid #888;
	width: 50%;
	border-radius: 7px;
	align-self: center;
	justify-content: center;
	transition: all 0.4s ease-out;
	padding: 20px;

	pre {
		font-size: 16px;
	}

	@media only screen and (max-width: 768px) {
		width: 90%;
	}

	@keyframes fadeByBottom {
		0% {
			opacity: 0;
			transform: translateY(-80%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
`

export const ModalContainerClose = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`

export const ModalClose = styled.span`
	font-size: 28px;
	font-weight: bold;

	&:hover,
	&:focus {
		text-decoration: none;
		cursor: pointer;
	}
`
