import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { apiErrorHandler } from 'utils/api-error-handler';
import { ContentProps } from 'types/content-props/_content-common';
import { PageBase } from 'components/PageBase';
import { mockStore } from 'store/store';

type Body = {
    contentProps?: ContentProps;
};

// TODO: add decorator, next.js scripts, css, etc

const postHandler = async (req: NextApiRequest, res: NextApiResponse) =>
    apiErrorHandler(req, res, async () => {
        if (req.headers.secret !== process.env.SERVICE_SECRET) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        if (req.method !== 'POST') {
            return res.status(405).send({ message: 'Method not allowed' });
        }

        if (!req.body?.contentProps) {
            return res.status(400).send({ message: 'Invalid request' });
        }

        const html = ReactDOMServer.renderToStaticMarkup(
            <Provider store={mockStore}>
                <PageBase content={(req.body as Body).contentProps as ContentProps} />
            </Provider>
        );

        return res.setHeader('Content-Type', 'text/html').send(html);
    });

export default postHandler;
