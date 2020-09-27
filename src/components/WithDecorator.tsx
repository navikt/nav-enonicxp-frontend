import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    hookAndInterceptInternalLink,
    prefetchOnMouseover,
} from '../utils/links';

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
        const linkPrefetcher = prefetchOnMouseover(router);
        const headerElement = document.getElementById('decorator-header');
        const footerElement = document.getElementById('decorator-footer');

        if (headerElement) {
            headerElement.addEventListener('click', linkInterceptor);
            headerElement.addEventListener('mouseover', linkPrefetcher);
        }

        if (footerElement) {
            footerElement.addEventListener('click', linkInterceptor);
            footerElement.addEventListener('mouseover', linkPrefetcher);
        }

        return () => {
            if (headerElement) {
                headerElement.removeEventListener('click', linkInterceptor);
                headerElement.removeEventListener('mouseover', linkPrefetcher);
            }

            if (footerElement) {
                footerElement.removeEventListener('click', linkInterceptor);
                footerElement.removeEventListener('mouseover', linkPrefetcher);
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
