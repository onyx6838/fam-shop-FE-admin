import Api from './Api';

const url = "/admin/thongke";

const totalRevenue = () => {
    return Api.get(`${url}/total-revenue`);
};

const totalProductSold = () => {
    return Api.get(`${url}/total-product-sold`);
};

const countOrderWithType = (trangThaiDonDat) => {
    return Api.get(`${url}/count-order?type=${trangThaiDonDat}`);
};

const statisticOrderByYear = (year, trangThaiDonDat) => {
    return Api.get(`${url}/statistic-order-year?year=${year}&type=${trangThaiDonDat}`);
};

const api = { totalRevenue, totalProductSold, countOrderWithType, statisticOrderByYear }
export default api;