import React from 'react';
import { Heading } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import ErrorPage404 from 'pages/404';
import Head from 'next/head';
import { DocumentParameter } from 'components/_common/metatags/DocumentParameterMetatags';

import style from './ContentTypeNotSupportedPage.module.scss';

export const ContentTypeNotSupportedPage = (props: ContentProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    return (
        <div className={style.notSupported}>
            <Head>
                <meta
                    name={DocumentParameter.DecoratorDisabled}
                    content={'true'}
                />
            </Head>
            <Heading level={'1'} size={'small'}>
                {'Innholdstypen '}
                <code className={style.type}>{props.type}</code>
                {' støtter ikke forhåndsvisning'}
            </Heading>
        </div>
    );
};