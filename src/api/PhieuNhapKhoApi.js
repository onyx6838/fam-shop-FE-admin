import Api from './Api';

const url = "/admin/pnk";

const getAllPNK = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getCTPNKByMaSP = (maSP, page, size) => {
    const parameters = {
        page,
        size
    }

    return Api.get(`${url}/ctpnk/${maSP}`, { params: parameters });
}

const addPNK = (form) => {
    return Api.post(`${url}`, form)
}

const checkCTDDHToCTPNK = (form) => {
    return Api.post(`${url}/check/ctddh/ctpnk`, form)
}

const api = { getAllPNK, getCTPNKByMaSP, addPNK, checkCTDDHToCTPNK }
export default api;