import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { enonicPathToAppPath } from '../utils/paths';
import { ContentTypeSchema } from '../types/content-types/_schema';
import { prefetchOnMouseover } from '../utils/links';
import { hookAndInterceptInternalLink } from '../utils/links';
import { Breadcrumb } from '../types/breadcrumb';
import { Language } from '../types/languages';
import GlobalNotifications from './part-components/notifications/GlobalNotifications';
import { NotificationProps } from '../types/content-types/notification-props';
import { initAmplitude, logPageview } from '../utils/amplitude';
import { HeadWithMetatags } from './part-components/_common/metatags/HeadWithMetatags';

type Props = {
    content: ContentTypeSchema;
    breadcrumbs: Breadcrumb[];
    languages: Language[];
    notifications?: NotificationProps[];
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, breadcrumbs, languages, notifications, children } = props;
    const router = useRouter();

    useEffect(() => {
        onBreadcrumbClick((breadcrumb) => router.push(breadcrumb.url));
        onLanguageSelect((breadcrumb) => router.push(breadcrumb.url));

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

        const path = `${content.isDraft ? '/draft' : ''}${enonicPathToAppPath(
            content._path
        )}`;

        if (breadcrumbs) {
            setBreadcrumbs(
                breadcrumbs.map((crumb) => ({ handleInApp: true, ...crumb }))
            );
        }

        if (languages) {
            setAvailableLanguages(
                languages.map((lang) => ({ handleInApp: true, ...lang }))
            );
        }

        // Ensures the url displayed in the browser is correct after redirection
        router.replace(path, undefined, {
            shallow: true,
        });
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
