import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setParams } from '@navikt/nav-dekoratoren-moduler';
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { ContentProps } from '../types/content-props/_content-common';
import { prefetchOnMouseover } from '../utils/links';
import { hookAndInterceptInternalLink } from '../utils/links';
import GlobalNotifications from './_common/notifications/GlobalNotifications';
import { initAmplitude, logPageview } from '../utils/amplitude';
import { HeadWithMetatags } from './_common/metatags/HeadWithMetatags';
import {
    pathToRoleContext,
    xpLangToDecoratorLang,
} from '../utils/document-utils';
import { getContentLanguages } from '../utils/languages';
import { xpPathToAppPath } from '../utils/paths';

type Props = {
    content: ContentProps;
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, children } = props;
    const { notifications } = content;

    const router = useRouter();

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

        logPageview();
        logPageview();

        // Prevents focus from "sticking" after async-navigation to a new page
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur && focusedElement.blur();

        const { breadcrumbs, language } = content;
        const path = window.location.href;
        const rolePath = path.split('/')[4];
        const context = pathToRoleContext[rolePath];
        const decoratorLang = xpLangToDecoratorLang[language] || 'nb';
        const languages = getContentLanguages(content);

        setParams({
            ...(context && {
                context: context,
            }),
            ...(decoratorLang && {
                language: decoratorLang as 'en' | 'se' | 'nb' | 'nn', // TODO: add 'pl' to decorator-modules!
            }),
            ...(breadcrumbs && {
                breadcrumbs: breadcrumbs.map((crumb) => ({
                    handleInApp: true,
                    ...crumb,
                })),
            }),
            ...(languages && {
                availableLanguages: languages.map((lang) => ({
                    handleInApp: true,
                    url: xpPathToAppPath(lang._path),
                    locale: xpLangToDecoratorLang[lang.language],
                })),
            }),
        });

        document.documentElement.lang = content?.language || 'no';
    }, [content]);

    return (
        <>
            <HeadWithMetatags content={content} />
            {notifications && (
                <GlobalNotifications notifications={notifications} />
            )}
            <div className={'content-wrapper'} id={'maincontent'}>
                {children}
            </div>
        </>
    );
};

export default PageWrapper;
