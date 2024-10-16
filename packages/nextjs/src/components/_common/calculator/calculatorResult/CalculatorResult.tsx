import React from 'react';
import { Panel } from '@navikt/ds-react';
import { translator } from 'translations';
import { insertHTMLBreaks, numberToFormattedValue } from 'utils/string';
import { usePageContentProps } from 'store/pageContext';

import style from './CalculatorResult.module.scss';

type Props = {
    summaryText: string;
    sum: number | null;
    useThousandSeparator: boolean;
    errorMessage: string;
};

export const CalculatorResult = (props: Props) => {
    const { summaryText, sum, useThousandSeparator, errorMessage } = props;
    const { language } = usePageContentProps();
    const getLabel = translator('calculator', language);

    if (errorMessage) {
        return (
            <Panel border className={style.summaryError}>
                <div>{getLabel('error')}</div>
                <em>{`"${errorMessage}"`}</em>
            </Panel>
        );
    }

    if (sum === null) {
        return null;
    }

    const buildSummaryHTML = () => {
        const sumAsHtml = `<strong>${numberToFormattedValue(sum, {
            useThousandSeparator,
        })}</strong>`;

        return insertHTMLBreaks(summaryText).replace('[result]', sumAsHtml);
    };

    return (
        <Panel border className={style.summaryText}>
            <div
                aria-live="assertive"
                aria-atomic={true}
                dangerouslySetInnerHTML={{
                    __html: buildSummaryHTML(),
                }}
            />
        </Panel>
    );
};
