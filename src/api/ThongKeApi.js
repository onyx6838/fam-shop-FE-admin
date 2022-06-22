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

const countCustomerBuyOrderDone = (year) => {
    return Api.get(`${url}/customer-order-success?year=${year}`);
};

const categorySoldWithOrder = () => {
    return Api.get(`${url}/category-most-sold`);
};

const productMostSold = () => {
    return Api.get(`${url}/product-most-sold`);
};


const api = {
    totalRevenue,
    totalProductSold,
    countOrderWithType,
    statisticOrderByYear,
    countCustomerBuyOrderDone,
    categorySoldWithOrder,
    productMostSold
}
export default api;