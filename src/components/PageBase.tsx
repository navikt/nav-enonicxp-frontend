import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { Breadcrumb } from '../types/breadcrumb';
import { LanguageSelectorProps } from '../types/language-selector-props';
import { NotificationProps } from '../types/notification-props';
import { useRouter } from 'next/router';
import { FallbackPage } from './pages/fallback-page/FallbackPage';
import PageWrapper from './PageWrapper';
import ContentMapper, { isContentTypeImplemented } from './ContentMapper';
import React from 'react';
import {
    fetchBreadcrumbs,
    fetchLanguageProps,
    fetchNotifications,
    fetchPage,
} from '../utils/fetch-content';
import { makeErrorProps } from '../types/content-props/error-props';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { getTargetIfRedirect } from '../utils/redirects';
import { routerQueryToXpPathOrId } from '../utils/paths';

type PageProps = {
    content: ContentProps;
    breadcrumbs: Breadcrumb[];
    languages: LanguageSelectorProps[];
    notifications: NotificationProps[];
};

type StaticProps = {
    props: PageProps;
    revalidate?: number;
    redirect?: { destination: string; permanent: boolean };
    notFound?: boolean;
};

export const PageBase = (props: PageProps) => {
    const router = useRouter();
    if (router.isFallback) {
        return <FallbackPage />;
    }

    if (!props?.content) {
        return (
            <ErrorPage
                {...makeErrorProps(
                    'www.nav.no',
                    'Ukjent feil - kunne ikke laste innhold'
                )}
            />
        );
    }

    const { breadcrumbs, content, languages, notifications } = props;

    return (
        <PageWrapper
            content={content}
            breadcrumbs={breadcrumbs}
            languages={languages}
            notifications={notifications}
        >
            <ContentMapper content={content} />
        </PageWrapper>
    );
};

export const fetchPageProps = async (
    routerQuery: string | string[],
    isDraft = false,
    secret: string,
    revalidate?: number
): Promise<StaticProps> => {
    const xpPath = routerQueryToXpPathOrId(routerQuery || '');
    const content = await fetchPage(xpPath, isDraft, secret);
    const contentPath = content._path;

    const defaultProps = {
        props: undefined,
        ...(revalidate && { revalidate }),
    };

    if (
        (content.__typename === ContentType.Error &&
            content.data.errorCode === 404) ||
        !isContentTypeImplemented(content)
    ) {
        return {
            ...defaultProps,
            notFound: true,
        };
    }

    if (content.__typename === ContentType.Error) {
        return {
            ...defaultProps,
            props: {
                content,
                breadcrumbs: [],
                languages: [],
                notifications: [],
            },
        };
    }

    if (content.__typename === ContentType.LargeTable) {
        return {
            ...defaultProps,
            props: {
                content,
                breadcrumbs: await fetchBreadcrumbs(contentPath, isDraft),
                languages: [],
                notifications: [],
            },
        };
    }

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return {
            ...defaultProps,
            redirect: { destination: redirectTarget, permanent: false },
        };
    }

    const breadcrumbs = await fetchBreadcrumbs(contentPath, isDraft);
    const { languages } = await fetchLanguageProps(contentPath, isDraft);
    const notifications = await fetchNotifications(contentPath, isDraft);

    return {
        ...defaultProps,
        props: {
            content,
            breadcrumbs,
            languages,
            notifications,
        },
    };
};

export default PageBase;
