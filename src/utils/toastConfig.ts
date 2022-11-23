import type { UseToastOptions } from '@chakra-ui/react';

const defaultToast: UseToastOptions = {
	isClosable: true,
	position: 'top-right',
	variant: 'solid',
	duration: 3000
};

export const errorToast: UseToastOptions = {
	...defaultToast,
	status: 'error'
};

export const successToast: UseToastOptions = {
	...defaultToast,
	status: 'success'
};
