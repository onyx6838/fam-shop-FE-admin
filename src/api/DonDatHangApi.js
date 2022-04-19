import Api from './Api';

const url = "/admin/dondathang";

const getAllDonDatHang = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const api = { getAllDonDatHang }
export default api;