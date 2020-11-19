import { BoxIconsProps } from './boxicons'

export interface FormProp extends React.ComponentPropsWithoutRef<'input'> {
	calendar?: boolean
	boxIcons: BoxIconsProps
	name: string
	mask?: string | (string | RegExp)[]
}
