import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalPurchaseOrderLine = ({ isOpen, closeModal, selectedItem }) => {
  return (
    <Modal show={isOpen} size='lg'>
      <Modal.Header>
        <Modal.Title>Đơn đặt hàng</Modal.Title>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-12">
              <div className="card" style={{ 'borderRadius': '10px' }}>
                <div className="card-body">
                  {
                    selectedItem.listCTDD.map(({ sanPham: { sanPhamFiles, ten, donGiaBan }, maCTDDH, soLuong, tongTienMuc }, i) => (
                      <div className="card shadow-0 border mb-4" key={maCTDDH}>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-2">
                              {
                                i === 0 ? <img src={`https://firebasestorage.googleapis.com/v0/b/fam-shop-4fd26.appspot.com/o/${sanPhamFiles[0].name}?alt=media&token=${sanPhamFiles[0].token}`} className="img-fluid" alt="Phone" /> : ""
                              }
                            </div>
                            <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">{ten}</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">{donGiaBan}đ</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">Số lượng: {soLuong}</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">Tổng tiền: {tongTienMuc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                  <div className="d-flex justify-content-between pt-2">
                    <h4 className="fw-bold mb-0">Thông tin đơn hàng</h4>
                    <p className="text-muted mb-0"><span className="fw-bold me-4"></span></p>
                  </div>

                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">Thời gian đặt</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{selectedItem.thoiGianDat}</p>
                  </div>

                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">Thời gian nhận hàng</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4"></span> {selectedItem.thoiGianNhanHang}</p>
                  </div>

                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">Địa chỉ</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4"></span> {selectedItem.diaChi}</p>
                  </div>

                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">SĐT Nhận hàng</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4"></span> {selectedItem.sdtNhanHang}</p>
                  </div>
                </div>
                <div className="card-footer border-0 px-4 py-5" style={{ 'backgroundColor': '#a8729a', 'borderBottomLeftRadius': '10px', 'borderBottomRightRadius': '10px' }}>
                  <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Tổng tiền:&nbsp;<span className="h2 mb-0 ms-2">{selectedItem.tongTien}</span></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalPurchaseOrderLine