import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const Card = defineStyleConfig({
	baseStyle(props) {
		const { colorScheme } = props;

		const bgColor = {
			light: colorScheme ? `${colorScheme}.900` : 'white',
			dark: colorScheme ? `${colorScheme}.100` : 'black'
		};

		const textColor = {
			name: {
				light: colorScheme ? `${colorScheme}.200` : 'blackAlpha.700',
				dark: colorScheme ? `${colorScheme}.700` : 'whiteAlpha.700'
			},
			number: {
				light: colorScheme ? `${colorScheme}.200` : 'blackAlpha.700',
				dark: colorScheme ? `${colorScheme}.700` : 'whiteAlpha.700'
			},
			availableLimit: {
				light: colorScheme ? `${colorScheme}.100` : 'blackAlpha.800',
				dark: colorScheme ? `${colorScheme}.800` : 'whiteAlpha.800'
			},
			limit: {
				light: colorScheme ? `${colorScheme}.300` : 'blackAlpha.600',
				dark: colorScheme ? `${colorScheme}.600` : 'whiteAlpha.600'
			}
		};

		const icon = {
			color: {
				light: colorScheme ? `${colorScheme}.800` : 'primaryApp.50',
				dark: colorScheme ? `${colorScheme}.200` : 'primaryApp.50'
			},
			bgColor: {
				light: colorScheme ? `${colorScheme}.300` : 'primaryApp.300',
				dark: colorScheme ? `${colorScheme}.700` : 'primaryApp.300'
			}
		};

		return {
			aspectRatio: '16/9',
			background: mode(bgColor.light, bgColor.dark)(props),
			boxShadow: 'sm',
			'#content': {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				height: '100%',
				position: 'relative',
				header: {
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
					div: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						bgColor: mode(icon.bgColor.light, icon.bgColor.dark)(props),
						color: mode(icon.color.light, icon.color.dark)(props),
						borderRadius: 'md'
					},
					'#name': {
						fontFamily: 'heading',
						textTransform: 'uppercase',
						color: mode(textColor.name.light, textColor.name.dark)(props),
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						fontWeight: 500
					}
				},
				'#number': {
					display: 'flex',
					justifyContent: 'space-between',
					fontFamily: 'heading',
					textTransform: 'uppercase',
					color: mode(textColor.number.light, textColor.number.dark)(props),
					fontWeight: 200,
					fontSize: '1.5rem'
				},
				footer: {
					flexDirection: 'column',
					alignItems: 'end',
					gap: '0.375rem',
					'#available': {
						textTransform: 'uppercase',
						whiteSpace: 'nowrap',
						fontWeight: 600,
						color: mode(
							textColor.availableLimit.light,
							textColor.availableLimit.dark
						)(props)
					},
					'#limit': {
						textTransform: 'uppercase',
						fontWeight: 400,
						color: mode(textColor.limit.light, textColor.limit.dark)(props)
					}
				},
				'#btnEdit': {
					position: 'absolute'
				}
			}
		};
	},
	variants: {
		new(props) {
			return {
				background: 'transparent',
				borderWidth: '2px',
				borderStyle: 'dashed',
				borderColor: 'primaryApp.300',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				WebkitTapHighlightColor: 'transparent',
				transition: '0.2s ease',
				'#content': {
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '0.5rem',
					fontSize: '1.5rem',
					'#name': {
						fontSize: '1rem',
						maxW: 'calc(100% - 1rem)',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis'
					}
				},
				_hover: {
					background: mode('blackAlpha.200', 'whiteAlpha.100')(props),
					'#content': {
						color: mode('primaryApp.700', 'primaryApp.200')(props)
					}
				},
				'&:last-of-type': {
					mr: '1rem'
				},
				'&:first-of-type': {
					ml: '1rem'
				}
			};
		},
		itemList(props) {
			const { colorScheme } = props;

			const borderColor = {
				light: colorScheme ? `${colorScheme}.900` : 'primaryApp.300',
				dark: colorScheme ? `${colorScheme}.100` : 'primaryApp.300'
			};

			return {
				cursor: 'pointer',
				position: 'relative',
				WebkitTransform: 'perspective(1px) translateZ(0)',
				transform: 'perspective(1px) translateZ(0)',
				'&:before': {
					content: '""',
					position: 'absolute',
					zIndex: -1,
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					borderColor: mode(borderColor.light, borderColor.dark)(props),
					borderStyle: 'solid',
					borderWidth: '0px',
					WebkitTransitionProperty: 'border-width',
					transitionProperty: 'border-width',
					WebkitTransitionDuration: '0.1s',
					transitionDuration: '0.1s',
					WebkitTransitionTimingFunction: 'ease',
					transitionTimingFunction: 'ease'
				},
				_hover: {
					'&:before': {
						webkitTransform: 'translateY(0)',
						transform: 'translateY(0)',
						borderWidth: '0.25rem'
					},
					boxShadow: 'lg'
				},
				_focus: {
					'&:before': {
						webkitTransform: 'translateY(0)',
						transform: 'translateY(0)',
						borderWidth: '0.25rem'
					}
				},
				_active: {
					'&:before': {
						webkitTransform: 'translateY(0)',
						transform: 'translateY(0)',
						borderWidth: '0.25rem'
					}
				},
				'&:last-of-type': {
					mr: '1rem'
				},
				'&:first-of-type': {
					ml: '1rem'
				}
			};
		}
	},
	sizes: {
		sm: {
			minW: [
				'calc(100% / 1.625)',
				'calc(100% / 2)',
				'calc(100% / 4)',
				'calc(100% / 5)',
				'calc(100% / 6)'
			],
			maxW: [
				'calc(100% / 1.625)',
				'calc(100% / 2)',
				'calc(100% / 4)',
				'calc(100% / 5)',
				'calc(100% / 6)'
			],
			borderRadius: 'lg',
			'&:before': {
				borderRadius: 'lg'
			},
			'#content': {
				padding: '0.875rem',
				header: {
					div: {
						w: '1.875rem',
						minW: '1.875rem',
						h: '1.875rem',
						svg: {
							w: '1.3rem',
							h: '1.3rem'
						}
					},
					'#name': {
						fontSize: '1rem',
						lineHeight: '1.875rem'
					}
				},
				footer: {
					'#available': {
						fontSize: '1.125rem',
						lineHeight: '1.125rem'
					},
					'#limit': {
						fontSize: '0.875rem',
						lineHeight: '0.875rem'
					}
				},
				'#btnEdit': {
					bottom: '0.875rem'
				}
			}
		},
		md: {
			minW: ['calc(100% / 1.5)', 'calc(100% / 4)', 'calc(100% / 5)'],
			maxW: ['calc(100% / 1.5)', 'calc(100% / 4)', 'calc(100% / 5)'],
			borderRadius: 'xl',
			'&:before': {
				borderRadius: 'xl'
			},
			'#content': {
				padding: '1.1rem',
				header: {
					div: {
						w: '2.5rem',
						minW: '2.5rem',
						h: '2.5rem',
						svg: {
							w: '1.6rem',
							h: '1.6rem'
						}
					},
					'#name': {
						fontSize: '1.125rem'
					}
				},
				footer: {
					'#available': {
						fontSize: '1.5rem',
						lineHeight: '1.5rem'
					},
					'#limit': {
						fontSize: '1rem',
						lineHeight: '1rem'
					}
				},
				'#btnEdit': {
					bottom: '1.1rem'
				}
			}
		},
		lg: {
			minW: ['100%', 'calc(100% / 2)', 'calc(100% / 3)', 'calc(100% / 4)'],
			maxW: ['100%', 'calc(100% / 2)', 'calc(100% / 3)', 'calc(100% / 4)'],
			borderRadius: '2xl',
			'&:before': {
				borderRadius: '2xl'
			},
			'#content': {
				padding: '1.375rem',
				header: {
					div: {
						w: '2.875rem',
						minW: '2.875rem',
						h: '2.875rem',
						svg: {
							w: '1.875rem',
							h: '1.875rem'
						}
					},
					'#name': {
						fontSize: '1.225rem'
					}
				},
				footer: {
					'#available': {
						fontSize: '1.8rem',
						lineHeight: '1.8rem'
					},
					'#limit': {
						fontSize: '1.3rem',
						lineHeight: '1.3rem'
					}
				},
				'#btnEdit': {
					bottom: '1.375rem'
				}
			}
		}
	},
	defaultProps: {
		size: 'lg'
	}
});
