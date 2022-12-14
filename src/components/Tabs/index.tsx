import {
	Flex,
	Icon,
	LinkBox,
	LinkOverlay,
	useColorModeValue
} from '@chakra-ui/react';
import { HouseLine, Receipt, UserCircleGear } from 'phosphor-react';
import { Link, useLocation } from 'react-router-dom';

export default function Tabs(): JSX.Element {
	const location = useLocation();

	const tabs = [
		{
			icon: UserCircleGear,
			text: 'Profile',
			href: '/profile'
		},
		{
			icon: HouseLine,
			text: 'Home',
			href: '/'
		},
		{
			icon: Receipt,
			text: 'Statement',
			href: '/account-statement'
		}
		// {
		//   icon: FaChartPie,
		//   text: "Gráficos",
		//   href: "/charts",
		// },
	];

	return (
		<Flex
			as="footer"
			position="sticky"
			w="full"
			bottom={0}
			align="center"
			h="4rem"
			mt="auto"
			boxShadow="0 -1px 2px 0 rgba(0, 0, 0, 0.05)"
			backgroundColor={useColorModeValue('white', 'black')}
			justify="space-between"
			zIndex="sticky"
		>
			{tabs.map((tab) => (
				<LinkBox
					display="flex"
					flex="auto"
					h="100%"
					alignItems="center"
					justifyContent="center"
					key={tab.href}
				>
					<LinkOverlay
						as={Link}
						to={tab.href}
					>
						<Flex
							direction="column"
							flexGrow={1}
							flexShrink={1}
							align="center"
							cursor="pointer"
							color={
								location.pathname === tab.href ? 'primaryApp.300' : 'gray.400'
							}
							transition="0.05s ease-in"
							_hover={{
								color: 'primaryApp.400'
							}}
							_active={{
								color: 'primaryApp.500'
							}}
						>
							<Icon
								as={tab.icon}
								w="1.5rem"
								h="1.5rem"
								lineHeight="1rem"
								transition="0.2s ease-in"
							/>
							{/* {location.pathname === tab.href && (
							<Text
								fontFamily="heading"
								fontSize="1rem"
								lineHeight="1rem"
								transition="0.2s ease-in"
							>
								{tab.text}
							</Text>
						)} */}
						</Flex>
					</LinkOverlay>
				</LinkBox>
			))}
		</Flex>
	);
}
