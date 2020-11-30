import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { PartComponentProps } from '../../types/component-props/_component-common';
import { XpComponent } from '../../components/ComponentMapper';
import {
    ContentProps,
    ContentType,
} from '../../types/content-props/_content-common';

const dummyPageProps: ContentProps = {
    __typename: ContentType.Site,
    _id: '',
    _path: '',
    createdTime: '',
    modifiedTime: '',
    displayName: '',
    language: 'no',
};

const postHandler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Method not allowed' });
    }

    if (!req.body?.props) {
        return res.status(400).send({ message: 'Invalid request' });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const props = req.body.props as PartComponentProps;

    const html = ReactDOMServer.renderToStaticMarkup(
        <XpComponent component={props} pageProps={dummyPageProps} />
    );

    return res.send(html);
};

export default postHandler;
