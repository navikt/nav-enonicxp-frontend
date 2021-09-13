import { Panel } from '@navikt/ds-react';
import { classNames, BEM } from '../../../utils/classnames';
import { translator } from 'translations';
import {
    insertHTMLBreaks,
    numberToFormattedValue,
} from '../../../utils/string';
import { usePageConfig } from 'store/hooks/usePageConfig';

import './Result.less';

interface ResultProps {
    summaryText: string;
    sum: number;
    useThousandSeparator: boolean;
    errorMessage: string;
}

const bem = BEM('calculator-result');

export const Result = (props: ResultProps) => {
    const { summaryText, sum, useThousandSeparator, errorMessage } = props;
    const { language } = usePageConfig();
    const getLabel = translator('calculator', language);

    const buildSummaryHTML = () => {
        const sumAsHtml = `<strong>${numberToFormattedValue(sum, {
            useThousandSeparator,
        })}</strong>`;

        return insertHTMLBreaks(summaryText).replace('[result]', sumAsHtml);
    };

    if (!errorMessage && sum === null) {
        return null;
    }

    if (errorMessage) {
        return (
            <Panel
                border
                className={classNames(bem(), bem('summaryError'))}
                role="alert"
            >
                <div>{getLabel('error')}</div>
                <em>"{errorMessage}"</em>
            </Panel>
        );
    }

    return (
        <Panel border className={classNames(bem(), bem('summaryText'))}>
            <div
                dangerouslySetInnerHTML={{
                    __html: buildSummaryHTML(),
                }}
            ></div>
        </Panel>
    );
};
