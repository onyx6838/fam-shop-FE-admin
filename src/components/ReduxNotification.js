import { toastr } from "react-redux-toastr";

const showSuccessNotification = (title, message) => {
    const options = {
        timeOut: 2500,
        showCloseButton: false,
        progressBar: false,
        position: "top-right"
    };

    // show notification
    toastr.success(title, message, options);
}

const showWrongNotification = (title, message) => {
    const options = {
        timeOut: 2500,
        showCloseButton: false,
        progressBar: false,
        position: "top-right"
    };

    // show notification
    toastr.error(title, message, options);
}

const showConfirmDeleteNotification = (title, toastrConfirmOptions) => {
    const options = {
        okText: 'Xóa',
        cancelText: 'Hủy',
        ...toastrConfirmOptions
    };
    toastr.confirm(title, toastrConfirmOptions);
}

const reduxNotification = { showSuccessNotification, showWrongNotification, showConfirmDeleteNotification }
export default reduxNotification