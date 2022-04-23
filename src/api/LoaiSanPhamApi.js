import Api from './Api';

const url = "/admin/loaisanphams";

const getChildCategory = () => {
    return Api.get(`${url}/child`);
};

const getAllLoaiSP = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const api = { getChildCategory, getAllLoaiSP }
export default api;