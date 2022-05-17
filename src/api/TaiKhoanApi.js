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

const lockAccount = (maTK) => {
    return Api.get(`${url}/lock-account/${maTK}`);
}

const unlockAccount = (maTK) => {
    return Api.get(`${url}/unlock-account/${maTK}`);
}

const api = { getAllTaiKhoan, getAccountsByRole, lockAccount, unlockAccount }
export default api;