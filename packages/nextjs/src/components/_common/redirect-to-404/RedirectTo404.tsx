import { useEffect } from 'react';

const NOT_FOUND_URL = `${process.env.APP_ORIGIN}/404`;

export const RedirectTo404 = () => {
    useEffect(() => {
        window.location.replace(NOT_FOUND_URL);
    }, []);

    return null;
};
