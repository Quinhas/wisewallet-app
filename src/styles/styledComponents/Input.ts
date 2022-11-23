import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
	baseStyle: {
		field: {
			minH: '3rem',
			height: '3rem',
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
