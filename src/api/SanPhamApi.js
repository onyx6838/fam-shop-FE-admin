import Api from './Api';

const url = "/admin/sanphams";

const getAll = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getAllPaging = (params) => {
    return Api.get(`${url}`, { params });
};

const uploadImage = (files, product) => {
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
    }
    formData.append('id', product)

    return Api.post(`${url}/file/upload`, formData , {
        headers: { "content-type": `multipart/form-data` }
    })
}

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const api = { getAll, getAllPaging, uploadImage, getById }
export default api;