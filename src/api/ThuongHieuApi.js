import Api from './Api';

const url = "/admin/thuonghieu";

const getAll = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getAllBrandWithoutPaging = () => {
    return Api.get(`${url}/all`);
};

const api = { getAll, getAllBrandWithoutPaging }
export default api;