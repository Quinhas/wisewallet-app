import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
