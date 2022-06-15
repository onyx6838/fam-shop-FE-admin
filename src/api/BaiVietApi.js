import Api from './Api';

const url = "/admin/baiviet";

const getAll = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const createShortBaiViet = (form) => {
    return Api.post(`${url}/short`, form)
}

const updateBV = (maBV, form) => {
    return Api.put(`${url}/${maBV}`, form);
};

const uploadImage = (file, post) => {
    let formData = new FormData();
    
    formData.append('file', file)
    formData.append('id', post)

    return Api.post(`${url}/file/upload`, formData, {
        headers: { "content-type": `multipart/form-data` }
    })
}

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const updateDescBV = (form, maBaiViet) => {
    return Api.put(`${url}/desc/${maBaiViet}`, form);
};

const api = {
    getAll,
    createShortBaiViet,
    updateBV,
    uploadImage,
    getById,
    updateDescBV
}

export default api;