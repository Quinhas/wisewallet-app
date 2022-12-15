import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const CardStatementItem = defineStyleConfig({
	baseStyle(props) {
		const colorScheme = props.colorScheme ?? 'primaryApp';

		const textColor = {
			title: {
				light: `gray.900`,
				dark: `whiteAlpha.900`
			},
			value: {
				light: `${colorScheme}.600`,
				dark: `${colorScheme}.600`
			},
			subtitle: {
				light: `blackAlpha.900`,
				dark: `whiteAlpha.600`
			}
		};

		const borderColor = {
			light: `${colorScheme}.600`,
			dark: `${colorScheme}.600`
		};

		const panel = {
			bgColor: {
				light: `blackAlpha.200`,
				dark: `whiteAlpha.200`
			}
		};

		const button = {
			bgColor: {
				light: 'whiteAlpha.900',
				dark: 'blackAlpha.800'
			}
		};

		return {
			boxShadow: 'sm',
			w: '100%',
			overflow: 'hidden',
			borderRadius: 'md',
			boxSizing: 'border-box',
			borderStyle: 'solid',
			borderWidth: '0 0 0 0.5rem',
			borderLeftColor: mode(borderColor.light, borderColor.dark)(props),
			'&:last-of-type': {
				borderBottomWidth: '0'
			},
			'.button': {
				background: mode(button.bgColor.light, button.bgColor.dark)(props),
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: '4rem',
				px: '1rem',
				_hover: {
					boxShadow: 'sm',
					background: mode(button.bgColor.light, button.bgColor.dark)(props)
				},
				'#title': {
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					fontWeight: 300,
					fontSize: '1rem',
					color: mode(textColor.title.light, textColor.title.dark)(props)
				},
				'#subtitle': {
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					fontWeight: 300,
					fontSize: '0.75rem',
					textTransform: 'uppercase',
					color: mode(textColor.subtitle.light, textColor.subtitle.dark)(props)
				},
				'#value': {
					textAlign: 'end',
					color: mode(textColor.value.light, textColor.value.dark)(props)
				},
				_expanded: {
					background: mode(button.bgColor.light, button.bgColor.dark)(props)
				}
			},
			'.panel': {
				background: mode(panel.bgColor.light, panel.bgColor.dark)(props)
			}
		};
	}
});
