import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { Breadcrumb } from '../types/breadcrumb';
import { LanguageSelectorProps } from '../types/language-selector-props';
import { NotificationProps } from '../types/content-types/notification-props';
import { useRouter } from 'next/router';
import { FallbackPage } from './page-components/fallback-page/FallbackPage';
import PageWrapper from './PageWrapper';
import ContentToComponentMapper from './ContentToComponentMapper';
import React from 'react';
import {
    fetchBreadcrumbs,
    fetchLanguages,
    fetchNotifications,
    fetchPage,
} from '../utils/fetch-content';
import { makeErrorProps } from '../types/content-types/error-props';
import { ErrorPage } from './page-components/error-page/ErrorPage';
import { getTargetIfRedirect } from '../utils/redirects';
import { routerQueryToXpPathOrId } from '../utils/paths';

type PageProps = {
    content: ContentTypeSchema;
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
        return <ErrorPage {...makeErrorProps('www.nav.no', 'Unknown error')} />;
    }

    const { breadcrumbs, content, languages, notifications } = props;

    return (
        <PageWrapper
            content={content}
            breadcrumbs={breadcrumbs}
            languages={languages}
            notifications={notifications}
        >
            <ContentToComponentMapper content={content} />
        </PageWrapper>
    );
};

export const fetchPageProps = async (
    routerQuery: string | string[],
    isDraft = false,
    revalidate?: number
): Promise<StaticProps> => {
    const xpPath = routerQueryToXpPathOrId(routerQuery || '');
    const content = await fetchPage(xpPath, isDraft);

    const defaultProps = {
        props: undefined,
        ...(revalidate && { revalidate }),
    };

    if (content.__typename === ContentType.Error && content.errorCode === 404) {
        return {
            ...defaultProps,
            notFound: true,
        };
    }

    if (
        content.__typename === ContentType.Error ||
        content.__typename === ContentType.LargeTable
    ) {
        return {
            ...defaultProps,
            props: {
                content: content,
                breadcrumbs: [],
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

    const contentPath = content._path;
    const breadcrumbs = await fetchBreadcrumbs(contentPath, isDraft);
    const languages = await fetchLanguages(contentPath, isDraft);
    const notifications = await fetchNotifications(contentPath, isDraft);

    return {
        ...defaultProps,
        props: {
            content: content,
            breadcrumbs: breadcrumbs,
            languages: languages,
            notifications: notifications,
        },
    };
};

export default PageBase;
