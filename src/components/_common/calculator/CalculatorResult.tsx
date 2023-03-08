import { Panel } from '@navikt/ds-react';
import { translator } from 'translations';
import {
    insertHTMLBreaks,
    numberToFormattedValue,
} from '../../../utils/string';
import { usePageConfig } from 'store/hooks/usePageConfig';
import style from './CalculatorResult.module.scss';
interface ResultProps {
    summaryText: string;
    sum: number;
    useThousandSeparator: boolean;
    errorMessage: string;
}

export const CalculatorResult = (props: ResultProps) => {
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
            <Panel border className={style.summaryError}>
                <div>{getLabel('error')}</div>
                <em>{`"${errorMessage}"`}</em>
            </Panel>
        );
    }

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
