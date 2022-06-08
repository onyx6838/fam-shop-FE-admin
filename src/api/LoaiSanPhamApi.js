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

const getAllLoaiSPIncludeChildAndParent = () => {
    return Api.get(`/loaisanphams`)
}

const createLSP = (form) => {
    return Api.post(`${url}/create`, form)
}

const getAllParentLSPIncludeAll = () => {
    return Api.get(`${url}/parents`);
}

const api = { getChildCategory, getAllLoaiSP, getAllLoaiSPIncludeChildAndParent, createLSP, getAllParentLSPIncludeAll }
export default api;