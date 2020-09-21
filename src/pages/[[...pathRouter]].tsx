import React from 'react';
import { enonicContentBasePath, routerQueryToEnonicPath } from '../utils/paths';
import { GetStaticPaths, GetStaticProps } from 'next';
import ContentToComponentMapper, {
    contentToComponentMap,
} from '../components/ContentToComponentMapper';
import { fetchHtml, fetchPage } from '../utils/fetch';
import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
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

    const content = await fetchPage(enonicPath);

    if (!contentToComponentMap[content.__typename]) {
        const path = content._path.replace(enonicContentBasePath, '');
        const html = await fetchHtml(path);
        content.__typename = ContentType.NotImplemented;
        content.data = { html: html || undefined };
    }

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
