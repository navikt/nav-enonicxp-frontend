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
import {
    getContentLanguages,
    getDecoratorLanguagesParam,
} from '../utils/languages';
import {
    pathToRoleContext,
    xpLangToDecoratorLang,
} from '../utils/decorator-utils';

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

        const { breadcrumbs, language } = content;
        const rolePath = window.location.href.split('/')[4];
        const context = pathToRoleContext[rolePath];

        setParams({
            ...(context && { context }),
            language: (xpLangToDecoratorLang[language] || 'nb') as
                | 'en'
                | 'se'
                | 'nb'
                | 'nn', // TODO: add 'pl' to decorator-modules!,
            breadcrumbs:
                breadcrumbs?.map((crumb) => ({
                    handleInApp: true,
                    ...crumb,
                })) || [],
            availableLanguages: getDecoratorLanguagesParam(
                getContentLanguages(content),
                language,
                content._path
            ),
        });

        document.documentElement.lang = language || 'no';
    }, [content]);

    return (
        <div
            className={`app${
                hasBreadcrumbsOrLanguageSelector ? ' app__offset' : ''
            }`}
        >
            <HeadWithMetatags content={content} />
            {notifications && (
                <GlobalNotifications notifications={notifications} />
            )}
            <div className={'content-wrapper'} id={'maincontent'}>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
