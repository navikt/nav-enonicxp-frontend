import React, { useEffect } from 'react';
import { make404Props } from '../utils/make-error-props';
import { PageBase } from '../components/PageBase';
import { useRouter } from 'next/router';

export const ErrorPage404 = () => {
    const props = make404Props();
    const router = useRouter();

    useEffect(() => {
        if (router.pathname !== '/404') {
            console.log('reloading');
            window.location.reload();
        }
    }, []);

    return <PageBase content={props} />;
};

export default ErrorPage404;
