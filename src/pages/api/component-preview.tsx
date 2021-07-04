import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { PartComponentProps } from '../../types/component-props/_component-common';
import { ComponentMapper } from '../../components/ComponentMapper';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import {
    ContentProps,
    ContentType,
} from '../../types/content-props/_content-common';
import globalState from '../../globalState';

const dummyPageProps: ContentProps = {
    __typename: ContentType.Site,
    _id: '',
    _path: '',
    createdTime: '',
    modifiedTime: '',
    displayName: '',
    language: 'no',
    isDraft: true,
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

    globalState.isDraft = true;

    const props = req.body.props as PartComponentProps;

    const html = ReactDOMServer.renderToStaticMarkup(
        <Provider store={store}>
            <ComponentMapper
                componentProps={props}
                pageProps={dummyPageProps}
            />
        </Provider>
    );

    return res.send(html);
};

export default postHandler;
