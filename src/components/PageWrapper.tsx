import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setParams } from '@navikt/nav-dekoratoren-moduler';
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { ContentProps } from '../types/content-props/_content-common';
import { prefetchOnMouseover } from '../utils/links';
import { hookAndInterceptInternalLink } from '../utils/links';
import { Breadcrumb } from '../types/breadcrumb';
import { LanguageSelectorProps } from '../types/language-selector-props';
import GlobalNotifications from './_common/notifications/GlobalNotifications';
import { NotificationProps } from '../types/notification-props';
import { initAmplitude, logPageview } from '../utils/amplitude';
import { HeadWithMetatags } from './_common/metatags/HeadWithMetatags';
import {
    pathToRoleContext,
    xpLangToDecoratorLang,
} from '../utils/document-utils';

type Props = {
    content: ContentProps;
    breadcrumbs: Breadcrumb[];
    languages: LanguageSelectorProps[];
    notifications?: NotificationProps[];
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, breadcrumbs, languages, notifications, children } = props;
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

        // Prevents focus from "sticking" after async-navigation to a new page
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur && focusedElement.blur();

        const path = window.location.href;
        const rolePath = path.split('/')[4];
        const context = pathToRoleContext[rolePath];
        const language = xpLangToDecoratorLang[content?.language] || 'nb';

        setParams({
            ...(context && { context }),
            language: language as 'en' | 'se' | 'nb' | 'nn', // TODO: add 'pl' to decorator-modules!
            breadcrumbs:
                breadcrumbs?.map((crumb) => ({
                    handleInApp: true,
                    ...crumb,
                })) || [],
            availableLanguages:
                languages?.map((lang) => ({
                    handleInApp: true,
                    ...lang,
                })) || [],
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
