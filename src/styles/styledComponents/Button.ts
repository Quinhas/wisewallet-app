import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
		},
		outline(props) {
			const { colorScheme: c } = props;
			const borderColor = `${c}.300`;
			const textColor = `${c}.300`;

			return {
				borderColor,
				textColor
			};
		}
	}
});
