import React from 'react'
import { useHistory } from 'react-router-dom'
import { ADDCARD } from '../../constants/routes'
import FormButtonStyled from '../Form/FormButton/FormButton.styled'
import {
	ModalClose,
	ModalContainerClose,
	ModalContentStyled,
	ModalStyled
} from './Modal.styled'

interface ModalProps {
	show: boolean
	modalText: string
}

const Modal = ({
	show,
	modalText,
	...rest
}: ModalProps & React.HTMLAttributes<HTMLSpanElement>) => {
	const history = useHistory()
	return (
		<ModalStyled show={show}>
			<ModalContentStyled>
				<ModalContainerClose>
					<h2>Response da chamada da API Valida Dados</h2>
					<ModalClose {...rest}>
						<box-icon name="x"></box-icon>
					</ModalClose>
				</ModalContainerClose>
				<pre>{modalText}</pre>
				<FormButtonStyled onClick={() => history.push(ADDCARD)}>
					Verificar cartão
				</FormButtonStyled>
			</ModalContentStyled>
		</ModalStyled>
	)
}

export default Modal
