import {
	Box,
	Flex,
	Icon,
	Text,
	useDisclosure,
	useStyleConfig
} from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import AccountModal from 'components/AccountModal';
import { Bank, Coins, IconProps, Wallet } from 'phosphor-react';
import React, { RefAttributes } from 'react';

type AccountCardProps = {
	id: string | number;
	name?: string;
	type: 'Cash' | 'Bank' | 'Others';
	value: number;
} & Partial<StyleFunctionProps>;

export default function AccountCard({
	id,
	name,
	type,
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

	const { isOpen, onOpen, onClose } = useDisclosure();

	const typeName: { [x: string]: string } = {
		Cash: 'Cash',
		Bank: 'Bank Account',
		Others: 'Others'
	};

	const icons: {
		[x: string]: React.ForwardRefExoticComponent<
			IconProps & RefAttributes<SVGSVGElement>
		>;
	} = {
		Cash: Coins,
		Bank,
		Others: Wallet
	};

	return (
		<>
			<Box
				__css={styles}
				onClick={onOpen}
			>
				<Flex className="iconBox">
					<Icon
						as={icons[type]}
						w="1.3rem"
						h="1.3rem"
					/>
				</Flex>
				<Box>
					<Text className="description">{name ?? typeName[type]}</Text>
					<Text
						fontSize="1.5rem"
						fontWeight="bold"
					>
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL'
						}).format(Number(value))}
					</Text>
				</Box>
			</Box>
			<AccountModal
				type={type}
				id={id}
				name={name}
				value={value}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
}
