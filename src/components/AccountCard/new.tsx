import {
	Box,
	Icon,
	LinkBox,
	LinkOverlay,
	Text,
	useStyleConfig
} from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { PlusCircle } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';

export default function NewAccountCard({
	colorScheme,
	colorMode,
	orientation,
	theme
}: Partial<StyleFunctionProps>): JSX.Element {
	const styles = useStyleConfig('AccountCard', {
		colorScheme,
		colorMode,
		orientation,
		theme,
		variant: 'new'
	});

	return (
		<Box
			as={LinkBox}
			__css={styles}
		>
			<LinkOverlay
				as={RouterLink}
				to="/account/new"
				className="link"
			>
				<Icon as={PlusCircle} />
				<Text>New Account</Text>
			</LinkOverlay>
		</Box>
	);
}
