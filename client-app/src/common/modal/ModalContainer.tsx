import { Modal } from "semantic-ui-react";

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (bool:boolean) => void;
    modalBody: any;
    setModalBody: (body:any) => void;
}

export default function ModalContainer({isModalOpen, setIsModalOpen, modalBody, setModalBody}: Props) {

    function closeModal() {
        setIsModalOpen(false);
        setModalBody(null);
    }
    // console.log("Haiii");
    return (
        <Modal open={isModalOpen} onClose={closeModal} size='mini'>
            <Modal.Content>
                {modalBody}
            </Modal.Content>
        </Modal>
    )
}
