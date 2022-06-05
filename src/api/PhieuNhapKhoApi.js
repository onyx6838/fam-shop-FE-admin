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

const api = { getAllPNK, getCTPNKByMaSP }
export default api;