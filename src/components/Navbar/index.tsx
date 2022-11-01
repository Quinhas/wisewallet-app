import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Heading,
	IconButton,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import Menu from 'components/Menu';
import ToggleThemeButton from 'components/ToggleThemeButton';
import { List } from 'phosphor-react';

export default function Navbar(): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Flex
				h="4rem"
				backgroundColor="primaryApp.300"
				justify="center"
				align="center"
				boxShadow="sm"
				px="1rem"
			>
				<Flex grow={1}>
					<Heading
						color={useColorModeValue('gray.50', 'gray.900')}
						fontSize="2rem"
					>
						Wisewallet
					</Heading>
				</Flex>
				<Flex>
					<IconButton
						aria-label="Menu"
						fontSize="1.25rem"
						icon={<List />}
						onClick={onOpen}
						variant="outline"
						borderRadius="md"
						textColor={useColorModeValue('gray.50', 'gray.900')}
						borderColor={useColorModeValue('gray.50', 'gray.900')}
						colorScheme={useColorModeValue('whiteAlpha', 'blackAlpha')}
					/>
				</Flex>
			</Flex>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent bg={useColorModeValue('white', 'black')}>
					<DrawerCloseButton />
					<DrawerHeader>Menu</DrawerHeader>

					<DrawerBody>
						<Menu />
					</DrawerBody>

					<DrawerFooter justifyContent="end">
						<ToggleThemeButton />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
