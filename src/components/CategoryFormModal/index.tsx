import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useToast
} from '@chakra-ui/react';
import { CategoryForm } from 'components/CategoryForm';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { wisewallet } from 'services/wisewalletService';
import { errorToast } from 'utils/toastConfig';

interface CategoryFormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CategoryFormModal({
	isOpen,
	onClose
}: CategoryFormModalProps): JSX.Element {
	const toast = useToast();

	async function onSubmit(data: CategoryDTO): Promise<void> {
		try {
			await wisewallet.categories.create({
				data: {
					description: data.description
				}
			});
			onClose();
		} catch (error) {
			if (error instanceof WisewalletApplicationException) {
				toast({
					...errorToast,
					description: error.message
				});
				return;
			}

			toast({
				...errorToast,
				description: 'Could not update bank account. Try again.'
			});
		}
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
