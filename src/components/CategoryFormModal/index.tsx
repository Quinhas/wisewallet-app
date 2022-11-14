import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react';
import { CategoryForm } from 'components/CategoryForm';
import { useWisewallet } from 'hooks/useWisewallet';
import { CategoryDTO } from 'services/wisewalletService/categoryService';

interface CategoryFormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CategoryFormModal({
	isOpen,
	onClose
}: CategoryFormModalProps): JSX.Element {
	const { createCategory } = useWisewallet();

	async function onSubmit(data: CategoryDTO): Promise<void> {
		await createCategory({
			category: {
				description: data.description
			}
		});
		onClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			motionPreset="slideInBottom"
		>
			<ModalOverlay backdropFilter="blur(0.15rem)" />
			<ModalContent
				maxW="calc(100vw - 2rem)"
				mx="1rem"
			>
				<ModalHeader>New category</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb="1.5rem">
					<CategoryForm onFormSubmit={onSubmit} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
