import { BoxIconsProps } from './boxicons'

export interface FormProp extends React.ComponentPropsWithoutRef<'input'> {
	calendar?: boolean
	boxIcons: BoxIconsProps
	name: string
	mask?: string | (string | RegExp)[]
}

export interface RadioProp extends React.ComponentPropsWithoutRef<'input'> {
	option: 'Crédito' | 'Débito'
	optionValue: 'CREDIT' | 'DEBIT'
}
