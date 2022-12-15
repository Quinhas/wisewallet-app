import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const Select = defineStyleConfig({
	baseStyle: {
		field: {
			cursor: 'pointer'
		}
	},
	variants: {
		outline(props) {
			const colorScheme = props.colorScheme ?? 'primaryApp';

			const colors = {
				border: {
					default: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props),
					focus: mode(`${colorScheme}.800`, `${colorScheme}.500`)(props),
					hover: mode(`${colorScheme}.700`, `${colorScheme}.300`)(props),
					invalid: {
						default: mode(`danger.600`, `danger.200`)(props),
						focus: mode(`danger.800`, `danger.500`)(props),
						hover: mode(`danger.700`, `danger.300`)(props)
					}
				}
			};

			return {
				field: {
					border: '1px solid',
					borderColor: colors.border.default,
					_focus: {
						borderColor: colors.border.focus,
						boxShadow: `0 0 0 1px var(--chakra-colors-${colorScheme}-300)`
					},
					_hover: {
						borderColor: colors.border.hover
					},
					_invalid: {
						borderColor: colors.border.default,
						_focus: {
							borderColor: colors.border.focus,
							boxShadow: '0 0 0 1px var(--chakra-colors-danger-300)'
						},
						_hover: {
							borderColor: colors.border.hover
						}
					}
				}
			};
		}
	},
	sizes: {
		xs: {
			field: {
				minW: 'var(--chakra-sizes-8)',
				minH: 'var(--chakra-sizes-8)',
				height: 'var(--chakra-sizes-8)',
				borderRadius: 'md'
			}
		},
		sm: {
			field: {
				minW: 'var(--chakra-sizes-10)',
				minH: 'var(--chakra-sizes-10)',
				height: 'var(--chakra-sizes-10)',
				borderRadius: 'md'
			}
		},
		md: {
			field: {
				minW: 'var(--chakra-sizes-12)',
				minH: 'var(--chakra-sizes-12)',
				height: 'var(--chakra-sizes-12)',
				borderRadius: 'lg'
			}
		},
		lg: {
			field: {
				minW: 'var(--chakra-sizes-16)',
				minH: 'var(--chakra-sizes-16)',
				height: 'var(--chakra-sizes-16)',
				borderRadius: 'lg'
			}
		}
	}
});
