import Api from './Api';

const url = "/admin/pnk";

const getAllPNK = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};


const api = { getAllPNK }
export default api;