import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react';
import { AccountForm } from 'components/AccountForm';
import { useWisewallet } from 'hooks/useWisewallet';
import { BankAccountDTO } from 'services/wisewalletService/bankAccountsService';

interface AccountFormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AccountFormModal({
	isOpen,
	onClose
}: AccountFormModalProps): JSX.Element {
	const { createBankAccount } = useWisewallet();

	function onSubmit(data: BankAccountDTO): void {
		createBankAccount({
			bankAccount: data
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
				<ModalHeader>New account</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb="1.5rem">
					<AccountForm onFormSubmit={onSubmit} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
