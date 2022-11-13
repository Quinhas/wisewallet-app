import { defineStyleConfig } from '@chakra-ui/react';

export const Textarea = defineStyleConfig({
	baseStyle: {
		borderRadius: '100%'
	},
	variants: {
		outline: {
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
});
