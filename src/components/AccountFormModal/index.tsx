import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useToast
} from '@chakra-ui/react';
import { AccountForm } from 'components/AccountForm';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { wisewallet } from 'services/wisewalletService';
import { errorToast } from 'utils/toastConfig';

interface AccountFormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AccountFormModal({
	isOpen,
	onClose
}: AccountFormModalProps): JSX.Element {
	const toast = useToast();

	async function onSubmit(data: BankAccountDTO): Promise<void> {
		try {
			await wisewallet.bankAccounts.create({
				data
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
				description: 'Could not create bank account. Try again.'
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
				<ModalHeader>New account</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb="1.5rem">
					<AccountForm onFormSubmit={onSubmit} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
