import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { Breadcrumb } from '../types/breadcrumb';
import { Language } from '../types/languages';
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
} from '../utils/fetchContent';

type Props = {
    content: ContentTypeSchema;
    breadcrumbs: Breadcrumb[];
    languages: Language[];
    notifications: NotificationProps[];
};

export const PageBase = (props: Props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <FallbackPage />;
    }

    const { breadcrumbs, content, languages, notifications } = props;

    return props?.content ? (
        <PageWrapper
            content={content}
            breadcrumbs={breadcrumbs}
            languages={languages}
            notifications={notifications}
        >
            <ContentToComponentMapper content={content} />
        </PageWrapper>
    ) : null;
};

export const fetchPageBaseProps = async (
    enonicPath: string,
    isDraft = false
): Promise<Props> => {
    const content = await fetchPage(enonicPath, isDraft);

    if (
        content.__typename === ContentType.Error ||
        content.__typename === ContentType.LargeTable
    ) {
        return {
            breadcrumbs: [],
            languages: [],
            content: content,
            notifications: [],
        };
    }

    // Use the path from the content object in case the initial path was redirected
    const pathActual = content._path;

    const breadcrumbs = await fetchBreadcrumbs(pathActual, isDraft);
    const languages = await fetchLanguages(pathActual, isDraft);
    const notifications = await fetchNotifications(pathActual, isDraft);

    return {
        breadcrumbs: breadcrumbs,
        languages: languages,
        content: content,
        notifications: notifications,
    };
};

export default PageBase;
