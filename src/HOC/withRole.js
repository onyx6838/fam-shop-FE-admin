import React from 'react';
import storage from '../storage/storage';
import AuthorizeDenied from '../pages/auth/AuthorizeDenied'

function withRole(AuthenticatedComponent) {

    class HOC extends React.Component {
        render() {
            return (
                storage.getItem("loaiTK") !== 'QUAN_TRI' ?
                    <AuthorizeDenied /> : <AuthenticatedComponent {...this.props} />
            );
        }
    }
    return HOC;
}

export default withRole;