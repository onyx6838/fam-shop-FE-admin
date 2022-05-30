import Api from './Api';

const url = "/admin/dactrung";

const getAllDacTrung = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getAllDacTrungNoneGr = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}/none`, { params: parameters });
};

const getDacTrungGrByLoai = (loaiDacTrung, page, size) => {
    return Api.post(`${url}/group?page=${page}&size=${size}`, loaiDacTrung, {
        headers: {
            'Content-Type': "application/json-patch+json"
        }
    });
};

const addDacTrung = (form) => {
    return Api.post(`${url}/create`, form)
}

const updateDacTrung = (maDacTrung, form) => {
    return Api.put(`${url}/${maDacTrung}`, form)
}

const api = { getAllDacTrung, getDacTrungGrByLoai, addDacTrung, getAllDacTrungNoneGr, updateDacTrung }
export default api;