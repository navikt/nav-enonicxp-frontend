import React, { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import { onBreadcrumbClick, onLanguageSelect, setParams } from '@navikt/nav-dekoratoren-moduler';
import { ContentProps } from 'types/content-props/_content-common';
import { hookAndInterceptInternalLink, prefetchOnMouseover } from 'utils/links';
import { hasWhiteHeader, hasWhitePage } from 'utils/appearance';
import { getDecoratorParams } from 'utils/decorator-utils';
import { getInternalRelativePath } from 'utils/urls';
import { store } from 'store/store';
import { fetchAndSetInnloggingsstatus } from 'utils/fetch/fetch-innloggingsstatus';
import { setAuthStateAction } from 'store/slices/authState';
import { fetchAndSetMeldekortStatus } from 'utils/fetch/fetch-meldekort-status';
import { classNames } from 'utils/classnames';
import { isLegacyContentType } from 'utils/content-types';
import { LegacyPageChatbot } from './_common/chatbot/LegacyPageChatbot';
import { EditorWidgets } from './_editor-only/EditorWidgets';
import { DocumentParameterMetatags } from './_common/metatags/DocumentParameterMetatags';
import { HeadWithMetatags } from './_common/metatags/HeadWithMetatags';
import { PageWarnings } from './_page-warnings/PageWarnings';

import styles from './PageWrapper.module.scss';

type Props = {
    content: ContentProps;
    children: React.ReactNode;
};

export const PageWrapper = (props: Props) => {
    const { content, children } = props;

    const isEditorView = !!content.editorView;

    const router = useRouter();

    useEffect(() => {
        // Checking auth status is not supported when viewed via Content Studio
        if (isEditorView) {
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

        if (!router) {
            return;
        }

        onBreadcrumbClick((breadcrumb) =>
            router.push(getInternalRelativePath(breadcrumb.url, isEditorView))
        );
        onLanguageSelect((language) =>
            router.push(getInternalRelativePath(language.url as string, isEditorView))
        );

        if (isEditorView) {
            return;
        }

        const linkInterceptor = hookAndInterceptInternalLink(router, isEditorView);
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
    }, [isEditorView, router]);

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

        if (decoratorParams.availableLanguages && router) {
            decoratorParams.availableLanguages.forEach((language) =>
                router.prefetch(language.url as string)
            );
        }

        document.documentElement.lang = content.language ?? 'no';
    }, [content, router]);

    return (
        <div className={hasWhitePage(content) ? styles.whiteBackground : styles.defaultBackground}>
            <div
                className={styles.appContainer}
                data-nosnippet={content.data?.nosnippet ? 'true' : undefined}
            >
                <DocumentParameterMetatags content={content} />
                <HeadWithMetatags content={content} />
                <PageWarnings content={content} />
                <EditorWidgets content={content} />
                <div
                    role={'main'}
                    className={classNames(
                        styles.contentWrapper,
                        hasWhiteHeader(content) && styles.whiteBackground,
                        isLegacyContentType(content.type) && styles.legacyType
                    )}
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
