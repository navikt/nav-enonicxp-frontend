import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { apiErrorHandler } from '../../utils/api-error-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { EditorSiteInfo } from '../../components/_editor/site-info/SiteInfo';
import { mockStore } from '../../store/store';
import { Provider } from 'react-redux';

const postHandler = async (req: NextApiRequest, res: NextApiResponse) =>
    apiErrorHandler(req, res, async () => {
        if (req.headers.secret !== process.env.SERVICE_SECRET) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        if (req.method !== 'POST') {
            return res.status(405).send({ message: 'Method not allowed' });
        }

        const props = JSON.parse(req.body) as EditorSiteInfo;

        const html = ReactDOMServer.renderToStaticMarkup(
            <Provider store={mockStore}>
                <EditorSiteInfo {...props} />
            </Provider>
        );

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        return res.send(html);
    });

export default postHandler;
