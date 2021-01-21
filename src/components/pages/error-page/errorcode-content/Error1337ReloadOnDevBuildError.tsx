import { useEffect } from 'react';
import { makeErrorProps } from '../../../../utils/errors';

export const error1337ReloadProps = (path: string) =>
    makeErrorProps(
        path,
        'Dette er en testmiljø-spesifikk bygg-feil - forsøk å refreshe siden 1-4 ganger',
        1337
    );

// "Error 1337" should be generated when a static page fails to build in a
// non-production environment. This will reload the page and trigger a cache revalidation
export const Error1337ReloadOnDevBuildError = () => {
    useEffect(() => {
        window.location.reload();
    }, []);

    return null;
};
