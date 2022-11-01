import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const MenuItem = defineStyleConfig({
	baseStyle: (props) => ({
		display: 'flex',
		alignItems: 'center',
		fontWeight: 500,
		height: 'auto',
		px: '0.5rem',
		py: '0.7rem',
		grow: 1,
		width: '100%',
		borderRadius: 'md',
		justifyContent: 'flex-start',
		cursor: 'pointer',
		color: mode('primaryApp.500', 'primaryApp.200')(props),
		transition: '0.2s',
		_hover: {
			color: 'primaryApp.500',
			backgroundColor: 'primaryApp.100',
			borderColor: 'primaryApp.200'
		},
		border: '1px solid',
		borderColor: 'primaryApp.200',
		backgroundColor: mode('white', 'black')(props)
	}),
	variants: {
		active: () => ({
			backgroundColor: 'primaryApp.100',
			color: 'primaryApp.900',
			_hover: {
				color: 'primaryApp.600',
				backgroundColor: 'primaryApp.200',
				borderColor: 'primaryApp.300'
			}
		})
	}
});
