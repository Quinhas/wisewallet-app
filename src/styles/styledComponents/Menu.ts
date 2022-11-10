import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(menuAnatomy.keys);

export const Menu = helpers.defineMultiStyleConfig({
	variants: {
		fab(props) {
			const { colorScheme: c } = props;
			const color = c ?? 'gray';
			return {
				list: {
					display: 'flex',
					flexDirection: 'column',
					gap: '0.5rem',
					background: 'transparent',
					borderWidth: 0,
					outline: 0,
					boxShadow: 'none'
				},
				item: {
					display: 'flex',
					px: '1.125rem',
					py: '0.6rem',
					flexDirection: 'row-reverse',
					color: 'gray.100',
					backgroundColor: `${color}.300`,
					borderRadius: '5rem',
					transition: 'background-color 0.3s',
					_hover: {
						backgroundColor: `${color}.400`
					},
					_active: {
						backgroundColor: `${color}.500`
					},
					_focus: {
						backgroundColor: `${color}.500`
					}
				}
			};
		}
	}
});
