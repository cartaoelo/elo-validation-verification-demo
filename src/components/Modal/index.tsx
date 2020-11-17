import React, { useState } from 'react'
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

const Modal = ({ show, modalText }: ModalProps) => {
	return (
		<ModalStyled show={show}>
			<ModalContentStyled>
				<ModalContentStyled>
					<ModalContainerClose>
						<h2>Response</h2>
						<ModalClose>
							<box-icon name="x"></box-icon>
						</ModalClose>
					</ModalContainerClose>
				</ModalContentStyled>
				<p>{modalText}</p>
			</ModalContentStyled>
		</ModalStyled>
	)
}

export default Modal
