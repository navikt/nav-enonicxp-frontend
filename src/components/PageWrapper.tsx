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
import TopContainer from './_common/top-container/TopContainer';
import { initAmplitude } from '../utils/amplitude';
import { HeadWithMetatags } from './_common/metatags/HeadWithMetatags';
import { getDecoratorParams } from '../utils/decorator-utils';
import { DocumentParameterMetatags } from './_common/metatags/DocumentParameterMetatags';
import { getInternalRelativePath } from '../utils/urls';
import { EditorHacks } from './_editor-only/editor-hacks/EditorHacks';

import { store } from '../store/store';
import { setPathMapAction } from '../store/slices/pathMap';
import { setPageConfigAction } from '../store/slices/pageConfig';
import { fetchAndSetAuthStatus } from '../utils/auth';
import { setAuthStateAction } from '../store/slices/authState';

type Props = {
    content: ContentProps;
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, children } = props;
    const { editorView } = content;

    const router = useRouter();

    useEffect(() => {
        // Checking auth status is not supported when viewed via Content Studio
        if (editorView) {
            store.dispatch(
                setAuthStateAction({
                    authState: 'loggedOut',
                })
            );
        } else {
            fetchAndSetAuthStatus();
        }

        onBreadcrumbClick((breadcrumb) =>
            router.push(getInternalRelativePath(breadcrumb.url, !!editorView))
        );
        onLanguageSelect((language) =>
            router.push(getInternalRelativePath(language.url, !!editorView))
        );

        initAmplitude();

        const linkInterceptor = hookAndInterceptInternalLink(router);
        const linkPrefetcher = !!editorView
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

        store.dispatch(setPathMapAction(content?.pathMap));
        store.dispatch(
            setPageConfigAction({
                pageId: content._id,
                language: content.language,
                isPagePreview: !!router.query.utkastRouter,
                editorView: content.editorView,
            })
        );

        // Prevents focus from "sticking" after async-navigation to a new page
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur && focusedElement.blur();

        // Updates decorator-parameters client-side when navigating to new content
        setParams(getDecoratorParams(content));

        document.documentElement.lang = content.language || 'no';
    }, [content]);

    return (
        <div className={'app-container'}>
            <EditorHacks content={content} />
            <DocumentParameterMetatags content={content} />
            <HeadWithMetatags content={content} />
            <TopContainer content={content} />
            <div
                role={'main'}
                className={'content-wrapper'}
                id={'maincontent'}
                tabIndex={-1}
            >
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
