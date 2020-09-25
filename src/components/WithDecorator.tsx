import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { hookAndInterceptInternalLink } from '../utils/links';

export const paramsObjectToQueryString = (params: object) =>
    encodeURI(
        Object.entries(params).reduce(
            (acc, [k, v], i) =>
                `${acc}${i ? '&' : ''}${k}=${JSON.stringify(v)}`,
            ''
        )
    );

export type DecoratorFragments = {
    HEADER: string | null;
    FOOTER: string | null;
    SCRIPTS: string | null;
    STYLES: string | null;
};

type Props = {
    fragments: DecoratorFragments;
    children: React.ReactNode;
};

export const WithDecorator = ({
    fragments: { HEADER, FOOTER, SCRIPTS, STYLES },
    children,
}: Props) => {
    const router = useRouter();

    useEffect(() => {
        const linkInterceptor = hookAndInterceptInternalLink(router);
        const headerElement = document.getElementById('decorator-header');
        const footerElement = document.getElementById('decorator-footer');

        if (headerElement) {
            headerElement.addEventListener('click', linkInterceptor);
        }

        if (footerElement) {
            footerElement.addEventListener('click', linkInterceptor);
        }

        return () => {
            if (headerElement) {
                headerElement.removeEventListener('click', linkInterceptor);
            }

            if (footerElement) {
                footerElement.removeEventListener('click', linkInterceptor);
            }
        };
    }, []);

    return (
        <>
            {STYLES && <Head>{parse(STYLES)}</Head>}
            {HEADER && parse(HEADER)}
            {children}
            {FOOTER && parse(FOOTER)}
            {SCRIPTS && parse(SCRIPTS)}
        </>
    );
};

export default WithDecorator;
