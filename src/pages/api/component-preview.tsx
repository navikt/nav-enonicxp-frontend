import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { PartComponentProps } from '../../types/component-props/_component-common';
import { ComponentMapper } from '../../components/ComponentMapper';
import { Provider } from 'react-redux';
import { mockStore } from '../../store/store';
import {
    ContentProps,
    ContentType,
} from '../../types/content-props/_content-common';

import { setPageConfigAction } from '../../store/slices/pageConfig';
import { apiErrorHandler } from '../../utils/api-error-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { PageContextProvider } from 'store/pageContext';

const dummyPageProps: ContentProps = {
    type: ContentType.DynamicPage,
    _id: '',
    _path: '',
    createdTime: '',
    modifiedTime: '',
    displayName: '',
    language: 'no',
    isDraft: true,
    editorView: 'edit',
    data: {},
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) =>
    apiErrorHandler(req, res, async () => {
        if (req.headers.secret !== process.env.SERVICE_SECRET) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        if (req.method !== 'POST') {
            return res.status(405).send({ message: 'Method not allowed' });
        }

        if (!req.body?.props) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        const props = req.body.props as PartComponentProps;

        mockStore.dispatch(
            setPageConfigAction({
                pageId: dummyPageProps._id,
                language: req.body?.props?.language || dummyPageProps.language,
                editorView: 'edit',
                isPagePreview: false,
            })
        );

        const html = ReactDOMServer.renderToStaticMarkup(
            <PageContextProvider content={dummyPageProps}>
                <Provider store={mockStore}>
                    <ComponentMapper
                        componentProps={props}
                        pageProps={dummyPageProps}
                    />
                </Provider>
            </PageContextProvider>
        );

        return res.send(html);
    });

export default postHandler;
