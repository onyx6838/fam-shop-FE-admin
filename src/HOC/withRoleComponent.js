import React from 'react';
import storage from '../storage/storage';

function withRoleComponent(AuthenticatedComponent) {
    class HOC extends React.Component {
        render() {
            return (
                storage.getItem("loaiTK") !== 'QUAN_TRI' ?
                    (<></>) : <AuthenticatedComponent {...this.props} />
            );
        }
    }
    return HOC;
}

export default withRoleComponent;