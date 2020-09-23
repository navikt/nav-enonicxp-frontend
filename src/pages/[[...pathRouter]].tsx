import React from 'react';
import { routerQueryToEnonicPath } from '../utils/paths';
import { GetStaticPaths, GetStaticProps } from 'next';
import ContentToComponentMapper from '../components/ContentToComponentMapper';
import { fetchPage } from '../utils/fetch';
import { ContentTypeSchema } from '../types/content-types/_schema';
import DynamicPageWrapper from '../components/DynamicPageWrapper';

type Props = {
    content: ContentTypeSchema;
};

const PathRouter = (props: Props) => {
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
    console.log('context:', context);

    const content = await fetchPage(enonicPath);
    console.log('content:', content);

    return {
        props: {
            content: content,
        },
        revalidate: 1,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { pathRouter: null } }],
        fallback: true,
    };
};

export default PathRouter;
