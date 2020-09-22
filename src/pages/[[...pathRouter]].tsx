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
    console.log('context:', context);

    const content = await fetchPage(enonicPath);
    console.log('content:', content);
    console.log(process.env.APP_BASE_PATH);

    if (!contentToComponentMap[content.__typename]) {
        const path = content._path?.replace(enonicContentBasePath, '');
        const legacyContent = await fetchHtml(path).then((res) => ({
            ...content,
            __typename: ContentType.NotImplemented,
            data: { html: res },
        }));

        return {
            props: {
                content: legacyContent,
            },
            revalidate: 1,
        };
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
