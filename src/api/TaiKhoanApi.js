import Api from './Api';

const url = "/admin/taikhoan";
const url1 = "/taikhoan";

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

const updateAccount = (maTK, form) => {
    return Api.put(`${url}/${maTK}`, form);
}

const addTaiKhoan = (form) => {
    return Api.post(`${url}`, form)
}

const extByEmail = (email) => {
    return Api.get(`${url1}/email/${email}`);
}

const extByTenTK = (tenTK) => {
    return Api.get(`${url1}/tenTK/${tenTK}`);
}

const api = {
    getAllTaiKhoan,
    getAccountsByRole,
    lockAccount,
    unlockAccount,
    updateAccount,
    addTaiKhoan,
    extByEmail,
    extByTenTK
}
export default api;