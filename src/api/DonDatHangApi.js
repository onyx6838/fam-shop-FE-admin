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

const api = { getAllDonDatHang, changeStatusDonDat }
export default api;