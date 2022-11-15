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
				position="sticky"
				w="full"
				top={0}
				align="center"
				px="1rem"
				h="4rem"
				boxShadow="sm"
				backgroundColor="primaryApp.300"
				justify="center"
				zIndex="sticky"
			>
				<Flex grow={1}>
					<Heading
						color="gray.50"
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
						textColor="gray.50"
						borderColor="gray.50"
						colorScheme="whiteAlpha"
					/>
				</Flex>
			</Flex>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent
					bg={useColorModeValue('white', 'black')}
					borderLeft="0.5px"
					borderStyle="solid"
					borderColor={useColorModeValue('gray.50', 'gray.900')}
				>
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
