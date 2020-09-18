import React from 'react';
import { routerQueryToEnonicPath } from '../utils/enonic-path';
import { GetStaticPaths, GetStaticProps } from 'next';
import ContentComponentMapper from '../components/content-component-mapper/ContentComponentMapper';
import { fetchPageContent } from '../utils/fetch-content';
import { ContentTypeSchemas } from '../types/schemas/_schemas';

type Props = {
    content: ContentTypeSchemas;
};

const PathRouter = (props: Props) => {
    return <ContentComponentMapper contentData={props.content} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const enonicPath = routerQueryToEnonicPath(
        context?.params?.pathRouter || ''
    );
    const content = await fetchPageContent(enonicPath);

    return {
        props: {
            content: content || '',
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { pathRouter: null } }],
        fallback: true,
    };
};

export default PathRouter;
