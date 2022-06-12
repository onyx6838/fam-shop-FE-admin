import Api from './Api';

const url = "/admin/dondathang";

const getAllDonDatHang = (page, size) => {
    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const changeStatusDonDat = (form) => {
    return Api.post(`${url}/change-status`, form)
}

const changeStatusTToan = (form) => {
    return Api.post(`${url}/change-payment`, form)
}

const getDistinctYearDatHang = () => {
    return Api.get(`${url}/distinct-year-dat-hang`)
}

const changeShipperDonDat = (form) => {
    return Api.post(`${url}/change-shipper-order`, form)
}

const api = {
    getAllDonDatHang,
    changeStatusDonDat,
    getDistinctYearDatHang,
    changeShipperDonDat,
    changeStatusTToan
}

export default api;