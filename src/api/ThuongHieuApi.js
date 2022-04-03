import Api from './Api';

const url = "/admin/thuonghieu";

const getAll = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const api = { getAll }
export default api;