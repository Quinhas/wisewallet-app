import { Flex, Spinner, Text } from '@chakra-ui/react';

export function Loading(): JSX.Element {
	return (
		<Flex
			w="100vw"
			h="100vh"
			align="center"
			justify="center"
		>
			<Flex
				direction="column"
				align="center"
				gridGap="1.5rem"
				bg="white"
				boxShadow="md"
				py="2rem"
				px="4rem"
				borderRadius="md"
			>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="primaryApp.300"
					size="xl"
				/>
				<Text color="gray.500">Loading...</Text>
			</Flex>
		</Flex>
	);
}
