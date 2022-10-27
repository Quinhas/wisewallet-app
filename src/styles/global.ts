import { extendTheme } from '@chakra-ui/react';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';
import { colors } from './colors';
import { mediaQueries, scrollbar } from './custom';

import {
	AccountCard,
	Button,
	Checkbox,
	Input,
	MenuItem,
	StatementListItem
} from './styledComponents';

const theme = extendTheme({
	components: {
		Button,
		Input,
		MenuItem,
		Checkbox,
		AccountCard,
		StatementListItem
	},
	styles: {
		global: (props: GlobalStyleProps) => ({
			'#__next': {
				display: 'flex',
				minHeight: '100vh',
				flexDirection: 'column'
			},
			html: {
				fontSize: '87.5%'
			},
			a: {
				fontWeight: 'medium',
				transition: 'color 0.2s',
				color: 'primaryApp.300',
				_hover: {
					color: 'primaryApp.500'
				},
				_active: {
					color: 'primaryApp.800'
				}
			},
			label: {
				fontFamily: 'heading',
				fontWeight: 'semibold',
				fontSize: '1.25rem'
			},
			'*': {
				margin: 0,
				padding: 0,
				boxSizing: 'border-box'
			},
			body: {
				background: mode('gray.50', 'gray.900')(props),
				color: mode('gray.800', 'gray.100')(props)
			},
			'input, button, select, textarea': {
				fontFamily: 'body'
			},
			...mediaQueries,
			...scrollbar
		})
	},
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false
	},
	fonts: {
		body: `'Montserrat', sans-serif`,
		heading: `'Poppins', sans-serif`,
		mono: `'Fira Mono', monospace`
	},
	colors
});

export default theme;
