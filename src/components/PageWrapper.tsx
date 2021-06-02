import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    onBreadcrumbClick,
    onLanguageSelect,
    setParams,
} from '@navikt/nav-dekoratoren-moduler';
import { ContentProps } from '../types/content-props/_content-common';
import {
    hookAndInterceptInternalLink,
    prefetchOnMouseover,
} from '../utils/links';
import TopContainer from './_common/notifications/TopContainer';
import { initAmplitude } from '../utils/amplitude';
import { HeadWithMetatags } from './_common/metatags/HeadWithMetatags';
import { getDecoratorParams } from '../utils/decorator-utils';
import { DocumentParameterMetatags } from './_common/metatags/DocumentParameterMetatags';
import { getInternalRelativePath } from '../utils/urls';
import { ComponentReorderHack } from '../utils/ComponentReorderHack';

import { usePageConfig } from '../store/hooks/usePageConfig';

type Props = {
    content: ContentProps;
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, children } = props;
    const { editMode } = content;

    const { setPageConfig } = usePageConfig();

    setPageConfig({ pageId: props.content._id, language: content.language });

    const router = useRouter();

    useEffect(() => {
        onBreadcrumbClick((breadcrumb) =>
            router.push(getInternalRelativePath(breadcrumb.url, editMode))
        );
        onLanguageSelect((language) =>
            router.push(getInternalRelativePath(language.url, editMode))
        );

        initAmplitude();

        const linkInterceptor = hookAndInterceptInternalLink(router);
        const linkPrefetcher = editMode
            ? undefined
            : prefetchOnMouseover(router);
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className={'app'}>
            <DocumentParameterMetatags content={content} />
            <HeadWithMetatags content={content} />
            {content.editMode && <ComponentReorderHack />}
            <TopContainer content={content} />
            <div className={'content-wrapper'} id={'maincontent'}>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
