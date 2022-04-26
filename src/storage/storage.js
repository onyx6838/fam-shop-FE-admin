const isRememberMe = () => {
    if (localStorage.getItem("isRememberMe") !== null && localStorage.getItem("isRememberMe") !== undefined) {
        return JSON.parse(localStorage.getItem("isRememberMe"));
    }
    return true;
}

const setRememberMe = (isRememberMe) => {
    localStorage.setItem("isRememberMe", isRememberMe);
}

const setItem = (key, value) => {
    if (isRememberMe()) {
        localStorage.setItem(key, value);
    } else {
        sessionStorage.setItem(key, value);
    }
}

const getItem = (key) => {
    if (isRememberMe()) {
        return localStorage.getItem(key);
    }
    return sessionStorage.getItem(key);
}

const removeItem = (key) => {
    if (isRememberMe()) {
        localStorage.removeItem(key);
    } else {
        sessionStorage.removeItem(key);
    }
}

const setToken = (token) => {
    setItem("token", token);
};

const removeToken = () => {
    removeItem("token");
};

const getToken = () => {
    return getItem("token");
}

const setRefreshToken = (token) => {
    setItem("refreshToken", token);
};

const removeRefreshToken = () => {
    removeItem("refreshToken");
};

const getRefreshToken = () => {
    return getItem("refreshToken");
}

const isAuth = () => {
    return getToken() !== null && getToken() !== undefined;
}

const setUserInfo = (user) => {
    const { hoTen, loaiTK, tenTK, trangThai, email } = user
    setItem("tenTK", tenTK);
    setItem("email", email);
    setItem("loaiTK", loaiTK);
    setItem("trangThai", trangThai);
    setItem("hoTen", hoTen);
}

const getUserInfo = () => {
    return {
        "tenTK": getItem("tenTK"),
        "email": getItem("email"),
        "loaiTK": getItem("loaiTK"),
        "trangThai": getItem("trangThai"),
        "hoTen": getItem("hoTen")
    };
}

const removeUserInfo = () => {
    removeItem("tenTK");
    removeItem("email");
    removeItem("loaiTK");
    removeItem("trangThai");
    removeItem("hoTen");
    removeItem("token");
    removeItem("refreshToken");
};

// export
const storage = {
    getItem, removeItem,
    isRememberMe, setRememberMe, setToken, getToken, removeToken,
    isAuth, setUserInfo, getUserInfo, removeUserInfo, setRefreshToken, removeRefreshToken, getRefreshToken
};
export default storage;