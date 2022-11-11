import {
	Box,
	Flex,
	Icon,
	Skeleton,
	Text,
	useStyleConfig
} from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { Bank } from 'phosphor-react';

export default function AccountCardSkeleton({
	colorScheme,
	colorMode,
	orientation,
	theme
}: Partial<StyleFunctionProps>): JSX.Element {
	const styles = useStyleConfig('AccountCard', {
		colorScheme,
		colorMode,
		orientation,
		theme
	});

	return (
		<Box
			__css={styles}
			p={0}
		>
			<Skeleton
				p="1rem"
				overflow="hidden"
				borderRadius="0.5rem"
			>
				<Flex
					alignItems="center"
					gap="0.5rem"
				>
					<Flex className="iconBox">
						<Icon
							as={Bank}
							w="1.3rem"
							h="1.3rem"
						/>
					</Flex>
					<Text className="description">name</Text>
				</Flex>
				<Box>
					<Text
						fontSize="1.5rem"
						fontWeight="bold"
					>
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL'
						}).format(Number(0))}
					</Text>
				</Box>
			</Skeleton>
		</Box>
	);
}
