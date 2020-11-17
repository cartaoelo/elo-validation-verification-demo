import styled from 'styled-components'

export const ModalStyled = styled.div`
	display: ${({ show }: { show: boolean }) => (show ? 'block' : 'none')};
	position: fixed;
	z-index: 1;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
`

export const ModalContentStyled = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fefefe;
	margin: 15% auto 10px;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;

	p {
		font-size: 16px;
	}
`

export const ModalContainerClose = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`

export const ModalClose = styled.span`
	color: #aaa;
	font-size: 28px;
	font-weight: bold;

	&:hover,
	&:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
`
