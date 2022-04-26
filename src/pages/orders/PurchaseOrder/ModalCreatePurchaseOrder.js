import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Scanner from './Scanner'

export default class ModalCreatePurchaseOrder extends Component {
    state = {
        results: [],
    }

    _scan = () => {
        this.setState({ scanning: !this.state.scanning })
    }

    _onDetected = result => {
        this.setState({ results: [] })
        this.setState({ results: this.state.results.concat([result]) })
    }

    render() {
        return (
            <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                <Modal.Header>
                    <Modal.Title>Đơn đặt hàng</Modal.Title>
                    <button type="button" className="close" aria-label="Close" onClick={this.props.closeModal}>
                        <span aria-hidden="true">×</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Scanner onDetected={this._onDetected} />
                    <p>{this.state.results[0] ? this.state.results[0].codeResult.code : 'No data scanned'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.closeModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
