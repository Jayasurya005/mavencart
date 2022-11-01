import React from 'react';
import { Redirect } from 'react-router-dom';

const SignOut = () => {
    localStorage.removeItem('accessToken');

    return (
        <Redirect to='/' />
    )
};

export default SignOut;