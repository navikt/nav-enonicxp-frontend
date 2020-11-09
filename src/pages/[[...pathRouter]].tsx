import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { routerQueryToEnonicPathOrId } from '../utils/paths';
import PageBase, { fetchPageBaseProps } from '../components/PageBase';
import { ContentType } from '../types/content-types/_schema';

export const getStaticProps: GetStaticProps = async (context) => {
    const enonicPath = routerQueryToEnonicPathOrId(
        context?.params?.pathRouter || ''
    );

    const props = await fetchPageBaseProps(enonicPath);

    if (props.content.__typename === ContentType.ExternalLink) {
        return {
            props: {},
            revalidate: 1,
            redirect: { destination: props.content.data.url, statusCode: 301 },
        };
    }

    return { props: props, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export default PageBase;
