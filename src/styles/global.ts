import { extendTheme } from '@chakra-ui/react';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';
import { AccountCard } from './styledComponents/AccountCard';
import { Button } from './styledComponents/Button';
import { Card } from './styledComponents/Card';
import { CardStatementItem } from './styledComponents/CardStatementItem';
import { Checkbox } from './styledComponents/Checkbox';
import { Input } from './styledComponents/Input';
import { Link } from './styledComponents/Link';
import { Menu } from './styledComponents/Menu';
import { CustomMenuItem } from './styledComponents/MenuItem';
import { Select } from './styledComponents/Select';
import { StatementListItem } from './styledComponents/StatementListItem';
import { Textarea } from './styledComponents/Textarea';

interface Colors {
	[key: string]: {
		[key: number]: string;
	};
}

const colors: Colors = {
	primaryApp: {
		50: '#ece9ff',
		100: '#c5bff7',
		200: '#9f94eb',
		300: '#7869e2',
		400: '#523fd9',
		500: '#3925bf',
		600: '#2b1d96',
		700: '#1e156c',
		800: '#120b43',
		900: '#06031b'
	},
	complementaryApp: {
		50: '#fff8dc',
		100: '#fdeab1',
		200: '#fbdc83',
		300: '#f9ce53',
		400: '#f7c024',
		500: '#dea60e',
		600: '#ac8106',
		700: '#7b5c01',
		800: '#4b3700',
		900: '#1c1200'
	},
	success: {
		50: '#EAFAEE',
		100: '#C5F1D0',
		200: '#A0E8B1',
		300: '#7BE093',
		400: '#56D774',
		500: '#31CE56',
		600: '#27A545',
		700: '#1D7C33',
		800: '#145222',
		900: '#0A2911'
	},
	warning: {
		50: '#FFF6E6',
		100: '#FEE7B9',
		200: '#FDD78B',
		300: '#FDC85E',
		400: '#FCB831',
		500: '#FCA903',
		600: '#C98703',
		700: '#976502',
		800: '#654301',
		900: '#322201'
	},
	danger: {
		50: '#FBE9EA',
		100: '#F4C2C3',
		200: '#EE9B9D',
		300: '#E77477',
		400: '#E04D51',
		500: '#D9262A',
		600: '#AE1E22',
		700: '#821719',
		800: '#570F11',
		900: '#2B0808'
	},

	google: {
		50: '#FDEAE8',
		100: '#F8C3BE',
		200: '#F49C95',
		300: '#F0756B',
		400: '#EB4F42',
		500: '#E72818',
		600: '#B92013',
		700: '#8B180E',
		800: '#5C100A',
		900: '#2E0805'
	},

	twitter: {
		50: '#dcf7ff',
		100: '#b0e2ff',
		200: '#82cdfa',
		300: '#53b9f6',
		400: '#26a5f3',
		500: '#0c8bd9',
		600: '#006caa',
		700: '#004d7b',
		800: '#002e4c',
		900: '#00101f'
	},

	facebook: {
		50: '#e7f0ff',
		100: '#c4d3ef',
		200: '#a0b5e0',
		300: '#7c98d0',
		400: '#587ac1',
		500: '#3e61a7',
		600: '#2f4b83',
		700: '#20365f',
		800: '#11203c',
		900: '#020b1b'
	},

	gray: {
		50: '#f2f2f2',
		100: '#d9d9d9',
		200: '#bfbfbf',
		300: '#a6a6a6',
		400: '#8c8c8c',
		500: '#737373',
		600: '#595959',
		700: '#404040',
		800: '#262626',
		900: '#0d0d0d'
	}
};

const theme = extendTheme({
	components: {
		Button,
		Input,
		CustomMenuItem,
		Checkbox,
		AccountCard,
		StatementListItem,
		Link,
		Menu,
		Select,
		Textarea,
		Card,
		CardStatementItem
	},
	styles: {
		global: (props: GlobalStyleProps) => ({
			'#root': {
				display: 'flex',
				minHeight: '100vh',
				maxHeight: '100vh',
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
				},
				textDecoration: 'none'
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
			mediaQueries: {
				'@media (min-width: 1361px) and (max-width: 1440px)': {
					html: {
						fontSize: '97.5%'
					}
				},

				'@media (max-width: 1360px)': {
					html: {
						fontSize: '85%'
					}
				},

				'@media (max-width: 1080px)': {
					html: {
						fontSize: '93.75%'
					}
				},

				'@media (max-width: 720px)': {
					html: {
						fontSize: '87.5%'
					}
				}
			}
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
