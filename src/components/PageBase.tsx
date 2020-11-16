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

type Props = {
    content: ContentTypeSchema;
    breadcrumbs: Breadcrumb[];
    languages: LanguageSelectorProps[];
    notifications: NotificationProps[];
};

export const PageBase = (props: Props) => {
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

export const fetchPageBaseProps = async (
    xpPath: string,
    isDraft = false
): Promise<Props> => {
    const content = await fetchPage(xpPath, isDraft);

    if (
        content.__typename === ContentType.Error ||
        content.__typename === ContentType.LargeTable
    ) {
        return {
            content: content,
            breadcrumbs: [],
            languages: [],
            notifications: [],
        };
    }

    // Use the path from the content object in case the initial path was redirected
    const pathActual = content._path;

    const breadcrumbs = await fetchBreadcrumbs(pathActual, isDraft);
    const languages = await fetchLanguages(pathActual, isDraft);
    const notifications = await fetchNotifications(pathActual, isDraft);

    return {
        content: content,
        breadcrumbs: breadcrumbs,
        languages: languages,
        notifications: notifications,
    };
};

export default PageBase;
