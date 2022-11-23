import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const StatementListItem = defineStyleConfig({
	baseStyle(props) {
		return {
			display: 'grid',
			gridTemplateColumns: '2fr 1fr',
			background: mode('white', 'black')(props),
			height: '4rem',
			w: '100%',
			borderRadius: 'md',
			borderBottom: '0.5px solid',
			borderBottomColor: `${mode('gray.200', 'gray.900')(props)}`,
			boxSizing: 'border-box',
			borderLeft: '0.5rem solid',
			direction: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			px: '1rem',
			'.value': {
				fontWeight: 'semibold',
				textAlign: 'end'
			},
			h2: {
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				fontWeight: 'medium',
				fontSize: '1rem'
			}
		};
	},
	variants: {
		income: {
			borderLeftColor: 'success.600',
			'.value': {
				color: 'success.600'
			}
		},
		expense: {
			borderLeftColor: 'danger.600',
			'.value': {
				color: 'danger.600'
			}
		},
		transfer: {
			borderLeftColor: 'complementaryApp.500',
			'.value': {
				color: 'complementaryApp.500'
			},
			'.info': {
				gap: '1rem',
				display: 'flex',
				overflow: 'hidden',
				me: '1rem',
				div: {
					flexDirection: 'column',
					justifyContent: 'space-between',
					'&:first-of-type': {
						fontFamily: 'mono',
						color: 'gray.500',
						textTransform: 'uppercase',
						fontSize: '0.75rem',
						p: {
							lineHeight: '1.33rem'
						}
					},
					'&:last-of-type': {
						overflow: 'hidden'
					}
				}
			}
		}
	}
});
