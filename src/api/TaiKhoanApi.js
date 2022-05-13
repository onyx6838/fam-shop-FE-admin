import Api from './Api';

const url = "/admin/taikhoan";

const getAllTaiKhoan = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getAccountsByRole = (page, size, role) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}/list-by-role?loaiTK=${role}`, { params: parameters });
};

const api = { getAllTaiKhoan, getAccountsByRole }
export default api;