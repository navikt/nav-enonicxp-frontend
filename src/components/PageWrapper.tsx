import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setParams } from '@navikt/nav-dekoratoren-moduler';
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { ContentProps } from '../types/content-props/_content-common';
import { prefetchOnMouseover } from '../utils/links';
import { hookAndInterceptInternalLink } from '../utils/links';
import GlobalNotifications from './_common/notifications/GlobalNotifications';
import { initAmplitude } from '../utils/amplitude';
import { HeadWithMetatags } from './_common/metatags/HeadWithMetatags';
import { getDecoratorParams } from '../utils/decorator-utils';
import { ServerSideOnlyMetatags } from './_common/metatags/ServerSideOnlyMetatags';
import { getContentLanguages } from '../utils/languages';

type Props = {
    content: ContentProps;
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, children } = props;
    const { notifications } = content;

    const router = useRouter();
    const hasBreadcrumbsOrLanguageSelector =
        content?.breadcrumbs?.length > 0 || !!getContentLanguages(content);

    useEffect(() => {
        onBreadcrumbClick((breadcrumb) => router.push(breadcrumb.url));
        onLanguageSelect((language) => router.push(language.url));

        initAmplitude();

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

        // Prevents focus from "sticking" after async-navigation to a new page
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur && focusedElement.blur();

        // Updates decorator-parameters client-side when navigating to new content
        setParams(getDecoratorParams(content));

        document.documentElement.lang = content.language || 'no';
    }, [content]);

    return (
        <div
            className={`app${
                hasBreadcrumbsOrLanguageSelector ? ' app__offset' : ''
            }`}
        >
            <ServerSideOnlyMetatags content={content} />
            <HeadWithMetatags content={content} />
            {notifications && (
                <GlobalNotifications
                    language={content?.language}
                    notifications={notifications}
                />
            )}
            <div className={'content-wrapper'} id={'maincontent'}>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
