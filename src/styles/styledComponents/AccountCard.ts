import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import chroma from 'chroma-js';

export const AccountCard = defineStyleConfig({
	baseStyle(props) {
		const { colorScheme: c } = props;
		const color = c;

		return {
			display: 'flex',
			background: color?.['100'] ?? mode('white', 'black')(props),
			padding: '1rem',
			gridGap: '0.5rem',
			borderRadius: '0.5rem',
			flexDirection: 'column',
			boxShadow: 'sm',
			minW: ['calc(100% / 2 - 2rem)', 'calc(100% / 2.3 - 2rem)'],
			flex: '1 1 auto',
			transition: '0.2s ease-in',
			cursor: 'pointer',
			WebkitTapHighlightColor: 'transparent',
			outline: 'none',
			mx: '0.5rem',
			_hover: {
				boxShadow: 'md'
			},
			'&:last-of-type': {
				mr: '1rem'
			},
			'&:first-of-type': {
				ml: '1rem'
			},
			'.description': {
				fontFamily: 'mono',
				fontSize: '1rem',
				textTransform: 'uppercase',
				color: chroma('#a6a6a6').darken().hex(),
				maxW: 'calc(100% - 2.5rem)',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis'
			},
			'.iconBox': {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgColor: c ? `${c}.600` : 'primaryApp.300',
				w: '2rem',
				minW: '2rem',
				h: '2rem',
				borderRadius: 'md',
				color: 'white'
			}
		};
	},
	variants: {
		new: {
			background: 'transparent',
			borderWidth: '2px',
			borderStyle: 'dashed',
			borderColor: 'primaryApp.300',
			alignItems: 'center',
			justifyContent: 'center',
			'.link': {
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '0.5rem',
				fontSize: '1.5rem',
				p: {
					fontSize: '1rem',
					maxW: 'calc(100% - 1rem)',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis'
				}
			},
			_hover: {
				background: 'primaryApp.50'
			}
		}
	}
});
