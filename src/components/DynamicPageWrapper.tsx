import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    onBreadcrumbClick,
    setBreadcrumbs,
} from '@navikt/nav-dekoratoren-moduler';
import { enonicPathToAppPath } from '../utils/paths';
import { ContentTypeSchema } from '../types/content-types/_schema';
import Head from 'next/head';

type Props = {
    content: ContentTypeSchema;
    children: React.ReactNode;
};

export const DynamicPageWrapper = ({ content, children }: Props) => {
    const router = useRouter();

    useEffect(() => {
        onBreadcrumbClick((breadcrumb) => router.push(breadcrumb.url));
    }, []);

    useEffect(() => {
        if (!content) {
            return;
        }

        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur && focusedElement.blur();

        setBreadcrumbs([
            {
                title: content.displayName,
                url: enonicPathToAppPath(content._path),
                handleInApp: true,
            },
        ]);

        // Ensures the url displayed in the browser is correct after static redirection
        if (content.didRedirect) {
            router.replace(enonicPathToAppPath(content._path), undefined, {
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
