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

    return Api.post(`${url}/file/upload`, formData, {
        headers: { "content-type": `multipart/form-data` }
    })
}

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const getAllParentSanPhams = () => {
    return Api.get(`${url}/parents`);
}

const deleteFileInDatabaseAndFireBase = (fileName, token) => {
    const body = {
        fileName,
        token
    }
    return Api.post(`${url}/file/db/delete`, body)
}

const addSanPham = (form) => {
    return Api.post(`${url}/create`, form)
}

const deleteByMaSP = (maSP) => {
    return Api.delete(`${url}/${maSP}`);
};

const deleteByMaSPs = (ids) => {
    return Api.delete(`${url}?maSPs=${ids.toString()}`);
};

const updateSP = (form, maSP) => {
    return Api.put(`${url}/${maSP}`, form);
};

const reactiveSP = (maSP) => {
    return Api.put(`${url}/re-active/${maSP}`);
};

const api = {
    getAll,
    getAllPaging,
    uploadImage,
    getById,
    deleteFileInDatabaseAndFireBase,
    getAllParentSanPhams,
    addSanPham,
    updateSP,
    deleteByMaSP,
    deleteByMaSPs,
    reactiveSP
}
export default api;