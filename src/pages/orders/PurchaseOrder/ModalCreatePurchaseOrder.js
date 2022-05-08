import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ModalCreatePurchaseOrder = ({ isOpen, closeModal }) => {
    const [data, setData] = useState("Not Found");
    const [stopStream, setStopStream] = useState(false);

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Phiếu nhập kho</Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <BarcodeScannerComponent
                    width={400}
                    height={400}
                    stopStream={stopStream}
                    onUpdate={(err, result) => {
                        if (result) {
                            setData(result.text);
                            setStopStream(true);
                        } else {
                            setData("Not Found");
                        }
                    }}
                />
                <p>{data}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={closeModal}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreatePurchaseOrder