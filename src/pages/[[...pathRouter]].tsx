import React from 'react';
import { routerQueryToEnonicPath } from '../utils/paths';
import { GetStaticPaths, GetStaticProps } from 'next';
import ContentToComponentMapper from '../components/ContentToComponentMapper';
import { fetchNotifications, fetchPage } from '../utils/fetchContent';
import { fetchBreadcrumbs, fetchLanguages } from '../utils/fetchContent';
import { ContentTypeSchema } from '../types/content-types/_schema';
import DynamicPageWrapper from '../components/DynamicPageWrapper';
import { useRouter } from 'next/router';
import { FallbackPage } from '../components/page-components/fallback-page/FallbackPage';
import { Breadcrumb } from '../types/breadcrumb';
import { Language } from '../types/languages';
import { NotificationProps } from '../types/content-types/notification-props';

type Props = {
    content: ContentTypeSchema;
    breadcrumbs: Breadcrumb[];
    languages: Language[];
    notifications: NotificationProps[];
};

const PathRouter = (props: Props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <FallbackPage />;
    }

    const { breadcrumbs, content, languages, notifications } = props;

    return props?.content ? (
        <DynamicPageWrapper
            content={content}
            breadcrumbs={breadcrumbs}
            languages={languages}
            notifications={notifications}
        >
            <ContentToComponentMapper content={content} />
        </DynamicPageWrapper>
    ) : null;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const enonicPath = routerQueryToEnonicPath(
        context?.params?.pathRouter || ''
    );

    const content = await fetchPage(enonicPath);
    const breadcrumbs = await fetchBreadcrumbs(enonicPath);
    const languages = await fetchLanguages(enonicPath);
    const notifications = await fetchNotifications(enonicPath);

    return {
        props: {
            breadcrumbs: breadcrumbs,
            languages: languages,
            content: content,
            notifications: notifications,
        },
        revalidate: 1,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export default PathRouter;
