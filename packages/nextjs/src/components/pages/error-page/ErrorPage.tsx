import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { ErrorProps } from 'types/content-props/error-props';
import { ErrorContent404 } from './errorcode-content/ErrorContent404';
import { ErrorContentDefault } from './errorcode-content/ErrorContentDefault';
import { ErrorContent408 } from './errorcode-content/ErrorContent408';
import { ErrorContent400 } from './errorcode-content/ErrorContent400';

import style from './ErrorPage.module.scss';

const errorContentByCode: Record<number, React.FunctionComponent<ErrorProps>> = {
    400: ErrorContent400,
    404: ErrorContent404,
    408: ErrorContent408,
};

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;

    const ErrorContent = errorContentByCode[errorCode] || ErrorContentDefault;

    return (
        <article className={style.errorPage}>
            <BodyLong size={'small'}>{`Statuskode ${errorCode}`}</BodyLong>
            <div className={style.header}>
                <Heading level={'1'} size={'large'} className={style.headerMsg}>
                    {errorMessage}
                </Heading>
            </div>
            <div className={style.content}>
                <ErrorContent {...props} />
            </div>
        </article>
    );
};
