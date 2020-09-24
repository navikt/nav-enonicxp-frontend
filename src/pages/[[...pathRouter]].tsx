import React from 'react';
import { routerQueryToEnonicPath } from '../utils/paths';
import { GetStaticPaths, GetStaticProps } from 'next';
import ContentToComponentMapper from '../components/ContentToComponentMapper';
import { fetchPage } from '../utils/fetch';
import { ContentTypeSchema } from '../types/content-types/_schema';
import DynamicPageWrapper from '../components/DynamicPageWrapper';

const NodeCache = require('node-cache');
import { JSDOM } from 'jsdom';

const { DECORATOR_URL } = process.env;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE,
});

interface Decorator {
    HEADER: string;
    FOOTER: string;
    SCRIPTS: string;
    STYLES: string;
}

interface Props {
    content: ContentTypeSchema;
    decorator: Decorator;
}

const PathRouter = (props: Props) => {
    const { content } = props;

    return content ? (
        <DynamicPageWrapper content={content}>
            <ContentToComponentMapper content={content} />
        </DynamicPageWrapper>
    ) : null;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const enonicPath = routerQueryToEnonicPath(
        context?.params?.pathRouter || ''
    );

    const content = await fetchPage(enonicPath);
    const decoratorBody = await fetch(DECORATOR_URL).then((res) => res.text());

    const { document } = new JSDOM(decoratorBody).window;
    const prop = 'innerHTML';
    const decoratorFragments = {
        HEADER: document.getElementById('header-withmenu')[prop],
        STYLES: document.getElementById('styles')[prop],
        FOOTER: document.getElementById('footer-withmenu')[prop],
        SCRIPTS: document.getElementById('scripts')[prop],
    };

    cache.set('decorator-cache', decoratorFragments);
    return {
        props: {
            content: content,
            decorator: decoratorFragments,
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
