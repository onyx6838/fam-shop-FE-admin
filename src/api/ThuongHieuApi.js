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

const uploadImage = (file, brand) => {
    let formData = new FormData();
    
    formData.append('file', file)
    formData.append('id', brand)

    return Api.post(`${url}/file/upload`, formData, {
        headers: { "content-type": `multipart/form-data` }
    })
}

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const api = { getAll, getAllBrandWithoutPaging, createThuongHieu, uploadImage, getById }
export default api;