import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Moon, Sun } from 'phosphor-react';

export default function ToggleThemeButton(): JSX.Element {
	const { toggleColorMode } = useColorMode();
	return (
		<IconButton
			aria-label="Toggle Theme"
			icon={useColorModeValue(<Moon />, <Sun />)}
			onClick={toggleColorMode}
			variant="outline"
			colorScheme="primaryApp"
			borderRadius="md"
		/>
	);
}
