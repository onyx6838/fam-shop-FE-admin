import Api from './Api';

const url = "/admin/theloaibaiviet";

const getAll = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getAllWithoutPage = () => {
    return Api.get(`${url}/list`);
}

const createTheLoai = (form) => {
    return Api.post(`${url}`, form)
}

const updateTLBV = (maTLBV, form) => {
    return Api.put(`${url}/${maTLBV}`, form);
};

const api = {
    getAll,
    createTheLoai,
    updateTLBV,
    getAllWithoutPage
}

export default api;