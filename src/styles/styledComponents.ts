import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import chroma from 'chroma-js';
import { colors } from './colors';

export const Input = defineStyleConfig({
	baseStyle: {
		field: {
			minH: '3rem',
			height: '3rem',
			background: 'red',
			borderRadius: '100%'
		}
	},
	variants: {
		outline: {
			field: {
				border: '1px solid',
				borderColor: 'primaryApp.200',
				_focus: {
					borderColor: 'primaryApp.500',
					boxShadow: '0 0 0 1px var(--chakra-colors-primaryApp-300)'
				},
				_hover: {
					borderColor: 'primaryApp.300'
				},
				_invalid: {
					borderColor: 'danger.200',
					_focus: {
						borderColor: 'danger.500',
						boxShadow: '0 0 0 1px var(--chakra-colors-danger-300)'
					},
					_hover: {
						borderColor: 'danger.500'
					}
				}
			}
		}
	}
});

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
			color: 'complementaryApp.500',
			backgroundColor: 'complementaryApp.100',
			borderColor: 'complementaryApp.200'
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

export const Checkbox = defineStyleConfig({
	baseStyle(props) {
		const { colorScheme: c } = props;

		return {
			control: {
				transitionTimingFunction: 'ease-in-out',
				transitionProperty: 'all',
				borderRadius: '0.25rem',
				borderColor: `${c}.300`,
				_hover: {
					bg: mode(`${c}.50`, `${c}.800`)(props)
				},
				_checked: {
					bg: mode(`${c}.300`, `${c}.200`)(props),
					borderColor: mode(`${c}.300`, `${c}.200`)(props),
					_hover: {
						bg: `${c}.300`,
						borderColor: `${c}.300`
					}
				}
			}
		};
	},

	sizes: {
		md: {
			control: {
				w: '1.5rem',
				h: '1.5rem'
			}
		}
	}
});

export const AccountCard = defineStyleConfig({
	baseStyle(props) {
		const { colorScheme: c } = props;
		const color = c ?? 'gray';
		const hexValue = colors?.[color];

		return {
			display: 'flex',
			background: color ? `${color}.300` : mode('white', 'black')(props),
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
				color: chroma(hexValue[300]).darken().hex()
			},
			'.iconBox': {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgColor: c ? `${c}.600` : 'primaryApp.300',
				w: '2rem',
				h: '2rem',
				borderRadius: 'md',
				color: 'white'
			}
		};
	}
});

export const StatementListItem = defineStyleConfig({
	baseStyle(props) {
		return {
			display: 'grid',
			gridTemplateColumns: '2fr 1fr',
			background: mode('white', 'black')(props),
			height: '4rem',
			w: '100%',
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

export const Button = defineStyleConfig({
	baseStyle: {
		borderRadius: '0.5rem',
		padding: '0.25rem',
		minH: '3rem',
		height: '3rem',
		boxShadow: 'sm'
	},
	variants: {
		solid(props) {
			const { colorScheme: c } = props;

			if (c === 'gray') {
				const bg = mode('gray.100', 'whiteAlpha.200')(props);

				return {
					bg,
					_hover: {
						bg: mode('gray.200', 'whiteAlpha.300')(props),
						_disabled: {
							bg
						}
					},
					_active: {
						bg: mode('gray.300', 'whiteAlpha.400')(props)
					}
				};
			}

			if (['facebook', 'google', 'twitter'].includes(c)) {
				const {
					bg = `${c}.500`,
					color = 'white',
					hoverBg = `${c}.600`,
					activeBg = `${c}.700`
				} = {};

				return {
					bg,
					color,
					_hover: {
						bg: hoverBg,
						_disabled: {
							bg
						}
					},
					_active: {
						bg: activeBg
					}
				};
			}

			const {
				bg = `${c}.300`,
				color = 'white',
				hoverBg = `${c}.400`,
				activeBg = `${c}.500`
			} = {};

			return {
				bg,
				color,
				_hover: {
					bg: hoverBg,
					_disabled: {
						bg
					}
				},
				_active: {
					bg: activeBg
				}
			};
		}
	}
});

export const Link = defineStyleConfig({
	baseStyle: {
		_hover: {
			textDecoration: 'none'
		}
	}
});
