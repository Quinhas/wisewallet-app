import { Flex } from '@chakra-ui/react';
import MenuItem from 'components/MenuItem';
import { useLocation } from 'react-router-dom';

const pages = [
	{
		name: 'Início',
		href: '/'
	},
	{
		name: 'New Account',
		href: '/account/new'
	},
	{
		name: 'New Transaction',
		href: '/transaction/new'
	}
	// ,{
	// 	name: 'New Transfer',
	// 	href: '/transfer/new'
	// }
];

export default function Menu(): JSX.Element {
	const location = useLocation();

	return (
		<Flex
			as="nav"
			w="100%"
			direction="column"
			gridGap="0.5rem"
		>
			{pages.map((page) => (
				<MenuItem
					key={page.href}
					href={page.href}
					name={page.name}
					variant={location.pathname === page.href ? 'active' : ''}
				/>
			))}
		</Flex>
	);
}
