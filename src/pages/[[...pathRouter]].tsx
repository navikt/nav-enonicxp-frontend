import React from 'react';
import { routerQueryToEnonicPath } from '../utils/paths';
import { GetStaticPaths, GetStaticProps } from 'next';
import ContentToComponentMapper from '../components/ContentToComponentMapper';
import { fetchPage } from '../utils/fetch';
import { ContentTypeSchema } from '../types/content-types/_schema';
import DynamicPageWrapper from '../components/DynamicPageWrapper';
import { useRouter } from 'next/router';
import { FallbackPage } from '../components/page-components/fallback-page/FallbackPage';

type Props = {
    content: ContentTypeSchema;
};

const PathRouter = (props: Props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <FallbackPage />;
    }

    return props?.content ? (
        <DynamicPageWrapper content={props.content}>
            <ContentToComponentMapper content={props.content} />
        </DynamicPageWrapper>
    ) : null;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const enonicPath = routerQueryToEnonicPath(
        context?.params?.pathRouter || ''
    );

    const content = await fetchPage(enonicPath);

    return {
        props: {
            content: content,
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
