import React, { Fragment } from 'react';
import { Detail, Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { FormDetailsData, Variation } from 'types/content-props/form-details';
import { InfoBox } from 'components/_common/infoBox/InfoBox';
import { AlertInContext } from 'components/_common/alertInContext/AlertInContext';
import { usePageContentProps } from 'store/pageContext';
import { ContentType } from 'types/content-props/_content-common';
import { FormDetailsButton } from './FormDetailsButton';

import style from './FormDetails.module.scss';

export type FormDetailsComponentProps = {
    formDetails: FormDetailsData;
    displayConfig: {
        showTitle: boolean;
        showIngress: boolean;
        showFormNumbers?: boolean;
        showAddendums?: boolean;
        showApplications?: boolean;
        showComplaints?: boolean;
    };
    className?: string;
    formNumberSelected?: string;
};

export const FormDetails = ({
    formDetails,
    displayConfig,
    className,
    formNumberSelected,
}: FormDetailsComponentProps) => {
    const {
        showTitle,
        showIngress,
        showFormNumbers,
        showAddendums = true,
        showApplications = true,
        showComplaints = true,
    } = displayConfig;

    const pageProps = usePageContentProps();

    const { formNumbers, formType, languageDisclaimer, ingress, title, alerts } = formDetails;

    const variations = formType.reduce<Variation[]>((acc, cur) => {
        const { _selected } = cur;

        if (
            (_selected === 'addendum' && !showAddendums) ||
            (_selected === 'application' && !showApplications) ||
            (_selected === 'complaint' && !showComplaints)
        ) {
            return acc;
        }

        const variations = cur[_selected]?.variations;

        if (variations) {
            acc.push(...variations);
        }

        return acc;
    }, []);

    const showTitleAsLevel4 = new Set([
        ContentType.ProductPage,
        ContentType.GuidePage,
        ContentType.CurrentTopicPage,
    ]).has(pageProps.type);

    const formNumberToHighlight =
        formNumberSelected &&
        formNumbers?.find((formNumber) => formNumber.toLowerCase().endsWith(formNumberSelected));

    const hasVisibleTitle = showTitle && title;
    const hasVisibleIngress = showIngress && ingress;
    const hasVisibleFormNumbers =
        showFormNumbers && Array.isArray(formNumbers) && formNumbers.length > 0;

    return (
        <div className={classNames(style.formDetails, className)}>
            {hasVisibleTitle && (
                <Heading
                    size={showTitleAsLevel4 ? 'small' : 'medium'}
                    level={showTitleAsLevel4 ? '4' : '3'}
                    spacing={!hasVisibleIngress && !hasVisibleFormNumbers}
                >
                    {title}
                </Heading>
            )}
            {hasVisibleFormNumbers && (
                <Detail className={style.formNumbers}>
                    {formNumbers.map((formNumber, index) => (
                        <Fragment key={formNumber}>
                            {index > 0 && (
                                <span aria-hidden={true} className={style.separator}>
                                    {'|'}
                                </span>
                            )}
                            <span
                                className={
                                    formNumber === formNumberToHighlight
                                        ? style.highlight
                                        : undefined
                                }
                                key={formNumber}
                            >
                                {formNumber}
                            </span>
                        </Fragment>
                    ))}
                </Detail>
            )}
            {hasVisibleIngress && (
                <div className={style.ingress}>
                    <ParsedHtml htmlProps={ingress} />
                </div>
            )}
            {languageDisclaimer && <InfoBox>{languageDisclaimer}</InfoBox>}
            {alerts &&
                alerts.map((alert, index) => <AlertInContext key={index} data={alert.data} />)}
            {variations.length > 0 && (
                <div className={style.variation}>
                    {variations.map((variation) => (
                        <FormDetailsButton key={variation.label} variation={variation} />
                    ))}
                </div>
            )}
        </div>
    );
};
