import React from 'react';

import history from 'utils/history';

import Page from 'layout/Page';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ForgotPasswordRequest from 'pages/Auth/ForgotPassRequest';
import Logout from 'pages/Auth/Logout';
import Redirect from 'components/Redirect';
import { get } from 'utils/storage';
import { addRoutes } from './utils';

addRoutes([
    {
        path: '/auth',
        action: (ctx) => {
            if (get('isLoggedIn')) {
                return <Redirect href='/user/my-townhalls' />;
            }
            return <Page>{ctx.next()}</Page>;
        },
        children: [
            {
                path: '/login',
                action: (ctx) => {
                    return (
                        ctx.next() || (
                            <Login onLogin={() => history.push('/home')} />
                        )
                    );
                },
            },
            {
                path: '/register',
                action: () => <Register />,
            },
            {
                path: '/forgot-password/request',
                action: () => <ForgotPasswordRequest />,
            },
        ],
    },

    {
        path: '/logout',
        action: () => {
            return <Logout />;
        },
    },
]);
