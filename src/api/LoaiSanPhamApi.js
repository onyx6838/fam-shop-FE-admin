import Api from './Api';

const url = "/admin/loaisanphams";

const getChildCategory = () => {
    return Api.get(`${url}/child`);
};

const api = { getChildCategory }
export default api;