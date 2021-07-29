import React from 'react';
import { ErrorProps } from 'types/content-props/error-props';
import { BodyLong, Ingress, Title } from '@navikt/ds-react';
import { Error404Content } from './errorcode-content/Error404Content';
import { Error1337ReloadOnDevBuildError } from './errorcode-content/Error1337ReloadOnDevBuildError';
import { BEM } from '../../../utils/classnames';
import Head from 'next/head';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import './ErrorPage.less';

const bem = BEM('error-page');

const errorContentSpecific = {
    404: Error404Content,
    1337: Error1337ReloadOnDevBuildError,
};

const ErrorContentDefault = ({ errorId }: { errorId?: string }) => {
    return (
        <>
            <BodyLong spacing={true}>
                {
                    'Det oppsto en feil som hindret denne siden fra å laste. Du kan forsøke å laste inn siden på nytt.'
                }
            </BodyLong>
            <BodyLong spacing={true}>
                {'Dersom problemet vedvarer kan du '}
                <LenkeInline
                    href={
                        'https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler'
                    }
                >
                    {'melde fra om teknisk feil.'}
                </LenkeInline>
                {errorId
                    ? " Inkluder gjerne feil-id'en under i din tilbakemelding."
                    : ''}
            </BodyLong>
            {errorId && <BodyLong size={'s'}>{`Feil-id: ${errorId}`}</BodyLong>}
        </>
    );
};

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode, errorId } = props.data;

    const ErrorContentSpecific = errorContentSpecific[errorCode];

    return (
        <div className={bem()}>
            <Head>
                <style type={'text/css'}>
                    {
                        // Skjuler andre brødsmuleledd for feilsider (privatperson/etc)
                        '.brodsmulesti li:nth-child(2):not(:last-child) {display: none;}'
                    }
                </style>
            </Head>
            <div className={bem('header')}>
                <Title level={1} size="xl" className={bem('header-msg')}>
                    {errorMessage}
                </Title>
                <Ingress
                    className={bem('header-code')}
                >{`Statuskode ${errorCode}`}</Ingress>
            </div>
            <div className={bem('content')}>
                {ErrorContentSpecific ? (
                    <ErrorContentSpecific />
                ) : (
                    <ErrorContentDefault errorId={errorId} />
                )}
            </div>
        </div>
    );
};
