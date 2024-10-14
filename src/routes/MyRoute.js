import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function MyRoute({ component: Component, isClosed, ...rest }){
    const isLoggedIn = true // useSelector(state => state.auth.isLoggedIn);

    if(isClosed && !isLoggedIn){
        return (
            <Redirect
                to={{pathname: '/login', state: { prevPath: rest.location.pathname }}}
            />
        );
    }

    return <Route { ...rest } component={Component} />
}

MyRoute.defaultProps = {
    isClosed: false,
}

MyRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
    isClosed: PropTypes.bool,
};
