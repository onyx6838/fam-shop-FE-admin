import Api from './Api';

const url = "/admin/danhgia";

const getParentDanhGias = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}/parent`, { params: parameters });
};

const getChildDanhGias = (page, size, maDanhGiaCha) => {
    const parameters = {
        page,
        size
    }
    return Api.get(`${url}/child/${maDanhGiaCha}`, { params: parameters });
};

const deleteChildCmt = (maDanhGia) => {
    return Api.delete(`${url}/child/${maDanhGia}`);
};

const lockChildCmt = (maDanhGia) => {
    return Api.delete(`${url}/child/lock/${maDanhGia}`);
};

const unlockChildCmt = (maDanhGia) => {
    return Api.delete(`${url}/child/unlock/${maDanhGia}`);
};

const checkReplyQuanTri = (maDanhGia) => {
    return Api.get(`${url}/parent/isReply/${maDanhGia}`);
};

const createQuanTriDanhGia = (form) => {
    return Api.post(`${url}/parent/adminRep`, form);
};

const updateQuanTriDanhGia = (form, maDanhGia) => {
    return Api.post(`${url}/parent/adminRep/update/${maDanhGia}`, form);
};

const getIdReplyQuanTri = (maDanhGia) => {
    return Api.get(`${url}/parent/find/adminRep/${maDanhGia}`);
};

const api = {
    getParentDanhGias,
    getChildDanhGias,
    deleteChildCmt,
    lockChildCmt,
    unlockChildCmt,
    checkReplyQuanTri,
    createQuanTriDanhGia,
    updateQuanTriDanhGia,
    getIdReplyQuanTri
}
export default api;