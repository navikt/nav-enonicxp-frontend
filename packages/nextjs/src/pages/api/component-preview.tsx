import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateSecretHeader } from '@/shared/auth';
import { ComponentMapper } from 'components/ComponentMapper';
import { mockStore } from 'store/store';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { PageContextProvider } from 'store/pageContext';
import { apiErrorHandler } from 'utils/api-error-handler';
import { ComponentProps } from 'types/component-props/_component-common';

type Body = {
    props: ComponentProps;
    contentProps?: ContentProps;
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) =>
    apiErrorHandler(req, res, async () => {
        if (!validateSecretHeader(req)) {
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

        const { props, contentProps } = req.body as Body;

        const contentPropsFull: ContentProps = {
            type: ContentType.DynamicPage,
            _id: '',
            _path: '',
            createdTime: '',
            modifiedTime: '',
            displayName: '',
            language: 'no',
            isDraft: true,
            editorView: 'edit',
            isPagePreview: false,
            data: {},
            ...contentProps,
        };

        const html = ReactDOMServer.renderToStaticMarkup(
            <PageContextProvider content={contentPropsFull}>
                <Provider store={mockStore}>
                    <ComponentMapper componentProps={props} pageProps={contentPropsFull} />
                </Provider>
            </PageContextProvider>
        );

        return res.send(html);
    });

export default postHandler;
