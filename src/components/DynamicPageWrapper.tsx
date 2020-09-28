import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    onBreadcrumbClick,
    setBreadcrumbs,
} from '@navikt/nav-dekoratoren-moduler';
import { enonicPathToAppPath } from '../utils/paths';
import { ContentTypeSchema } from '../types/content-types/_schema';
import Head from 'next/head';
import {
    hookAndInterceptInternalLink,
    prefetchOnMouseover,
} from '../utils/links';

type Props = {
    content: ContentTypeSchema;
    children: React.ReactNode;
};

export const DynamicPageWrapper = ({ content, children }: Props) => {
    const router = useRouter();

    useEffect(() => {
        onBreadcrumbClick((breadcrumb) => router.push(breadcrumb.url));

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

    useEffect(() => {
        if (!content) {
            return;
        }

        // Focus sometimes "sticks" after navigating to a new page
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur && focusedElement.blur();

        const enonicPath = enonicPathToAppPath(content._path);

        setBreadcrumbs([
            {
                title: content.displayName,
                url: enonicPath || '/',
                handleInApp: true,
            },
        ]);

        // Ensures the url displayed in the browser is correct after static redirection
        if (content.didRedirect && enonicPath) {
            router.replace(enonicPath, undefined, {
                shallow: true,
            });
        }
    }, [content]);

    return (
        <>
            <Head>
                <title>{`${content.displayName} - nav.no`}</title>
            </Head>
            {children}
        </>
    );
};

export default DynamicPageWrapper;
