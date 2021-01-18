import { useEffect } from 'react';

// "Error 1337" is generated when a static page fails to build in a dev-environment...
// This will reload the page, which should trigger a cache revalidation
export const Error1337Content = () => {
    useEffect(() => {
        window.location.reload();
    }, []);

    return null;
};
