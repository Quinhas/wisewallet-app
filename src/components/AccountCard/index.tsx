import { Box, Flex, Icon, Text, useStyleConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { Bank } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

type AccountCardProps = {
	id: string | number;
	name: string;
	value: number;
} & Partial<StyleFunctionProps>;

export default function AccountCard({
	id,
	name,
	value,
	colorScheme,
	colorMode,
	orientation,
	theme
}: AccountCardProps): JSX.Element {
	const styles = useStyleConfig('AccountCard', {
		colorScheme,
		colorMode,
		orientation,
		theme
	});
	const navigate = useNavigate();

	return (
		<Box
			__css={styles}
			onClick={() => navigate(`/account/${id}`)}
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
				<Text className="description">{name}</Text>
			</Flex>
			<Box>
				<Text
					fontSize="1.375rem"
					fontWeight={600}
				>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(Number(value))}
				</Text>
			</Box>
		</Box>
	);
}
