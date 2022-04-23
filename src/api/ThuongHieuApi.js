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

const createThuongHieu = (form) => {
    const { file, tenThuongHieu } = form;
    let formData = new FormData();

    formData.append('file', file)
    formData.append('tenThuongHieu', tenThuongHieu)

    return Api.post(`${url}/create`, formData, {
        headers: { "content-type": `multipart/form-data` }
    })
}

const api = { getAll, getAllBrandWithoutPaging, createThuongHieu }
export default api;