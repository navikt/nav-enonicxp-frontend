import React, { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import {
    onBreadcrumbClick,
    onLanguageSelect,
    setParams,
} from '@navikt/nav-dekoratoren-moduler';
import { ContentProps } from 'types/content-props/_content-common';
import { hookAndInterceptInternalLink, prefetchOnMouseover } from 'utils/links';
import { hasWhiteBackground } from 'utils/appearance';
import { TopContainer } from './_top-container/TopContainer';
import { HeadWithMetatags } from './_common/metatags/HeadWithMetatags';
import { getDecoratorParams } from 'utils/decorator/decorator-utils';
import { DocumentParameterMetatags } from './_common/metatags/DocumentParameterMetatags';
import { getInternalRelativePath } from 'utils/urls';
import { EditorHacks } from './_editor-only/editor-hacks/EditorHacks';

import { store } from 'store/store';
import { setPageConfigAction } from 'store/slices/pageConfig';
import { fetchAndSetInnloggingsstatus } from 'utils/fetch/fetch-innloggingsstatus';
import { setAuthStateAction } from 'store/slices/authState';
import { fetchAndSetMeldekortStatus } from 'utils/fetch/fetch-meldekort-status';
import { LegacyPageChatbot } from './_common/chatbot/LegacyPageChatbot';
import classNames from 'classnames';
import { DuplicateIdsWarning } from 'components/_editor-only/duplicate-ids-warning/DuplicateIdsWarning';

type Props = {
    content: ContentProps;
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, children } = props;
    const { editorView } = content;

    const router = useRouter();

    store.dispatch(
        setPageConfigAction({
            pageId: content._id,
            language: content.language,
            isPagePreview: content.isPagePreview,
            editorView: content.editorView,
        })
    );

    useEffect(() => {
        // Checking auth status is not supported when viewed via Content Studio
        if (editorView) {
            store.dispatch(
                setAuthStateAction({
                    authState: 'loggedOut',
                })
            );
        } else {
            fetchAndSetInnloggingsstatus().then((res) => {
                if (res?.authenticated) {
                    fetchAndSetMeldekortStatus();
                }
            });
        }

        onBreadcrumbClick((breadcrumb) =>
            router.push(getInternalRelativePath(breadcrumb.url, !!editorView))
        );
        onLanguageSelect((language) =>
            router.push(getInternalRelativePath(language.url, !!editorView))
        );

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

        // Prevents focus from "sticking" after async-navigation to a new page
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur && focusedElement.blur();

        // Updates decorator-parameters client-side when navigating to new content
        const decoratorParams = getDecoratorParams(content);
        setParams(decoratorParams);

        if (decoratorParams.availableLanguages) {
            decoratorParams.availableLanguages.forEach((language) =>
                router.prefetch(language.url)
            );
        }

        document.documentElement.lang = content.language || 'no';
    }, [content, router]);

    return (
        <div
            className={classNames(
                'app-background',
                hasWhiteBackground(content) && 'white'
            )}
        >
            <div className={classNames('app-container')}>
                <EditorHacks content={content} />
                {editorView && <DuplicateIdsWarning />}
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
                    <LegacyPageChatbot content={content} />
                </div>
            </div>
        </div>
    );
};
