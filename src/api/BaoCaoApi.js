import Api from './Api';

const url = "/admin/baocao";

const exportSanPhamToExcel = () => {
    return Api.get(`${url}/sanphams/export/excel`, { responseType: 'blob' });
};

const api = {
    exportSanPhamToExcel
}
export default api;