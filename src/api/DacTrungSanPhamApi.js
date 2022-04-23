import Api from './Api';

const url = "/admin/dactrungsanpham";

const getAllDacTrungSP = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getDacTrungBySanPham = (page, size, maSP) => {
    return Api.get(`${url}/${maSP}?page=${page}&size=${size}`);
};

const addDacTrungToSP = (form) => {
    return Api.post(`${url}/add`, form)
}

const deleteDacTrungSP = (form) => {
    return Api.post(`${url}/delete`, form)
}

const api = { getAllDacTrungSP,getDacTrungBySanPham, addDacTrungToSP, deleteDacTrungSP }
export default api;