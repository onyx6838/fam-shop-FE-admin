import React from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../storage/storage';

function withAuth(AuthenticatedComponent) {

    class HOC extends React.Component {
        render() {
            return (
                !storage.isAuth() ?
                    <Navigate 
                        to={{
                            pathname: "/auth/sign-in"
                        }} replace
                    />
                    :
                    <AuthenticatedComponent {...this.props} />
            );
        }
    }
    return HOC;
}

export default withAuth;