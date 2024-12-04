import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { UserVerification } from "../../models";
import { verifyUser } from "../../actions";

interface Props {
    userId: number | null;
    userVerification: UserVerification | null;
    token: string | null;
    isVerificationModalOpen: boolean;
    toggleVerificationModal: () => void;
}

export const UserVerificationModal = ({ userId, userVerification, token, isVerificationModalOpen, toggleVerificationModal }: Props) => {

    const handleVerification = async () => {
        if (!userId || !token) return

        try {
            const response = await verifyUser(userId.toString(), token)
            if (response) {
                toggleVerificationModal();
            }
        } catch (error) {
            console.error('Error verifying user:', error)
        }
    }

    return (
        <Modal isOpen={isVerificationModalOpen} onClose={toggleVerificationModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Verification Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDirection={'column'} gap={'10px'}>
                        <Text><strong>Name:</strong> {userVerification?.name ?? 'N/A'}</Text>
                        <Text><strong>DNI:</strong> {userVerification?.dni ?? 'N/A'}</Text>
                        <Text><strong>Address:</strong> {userVerification?.address ?? 'N/A'}</Text>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={toggleVerificationModal}>Close</Button>
                    <Button onClick={handleVerification} colorScheme="teal" type="submit">Verify</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}