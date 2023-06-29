import React, { Fragment } from 'react';
import { Detail, Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { FormDetailsData, Variation } from 'types/content-props/form-details';
import { FormDetailsButton } from './FormDetailsButton';

import style from './FormDetails.module.scss';

export type FormDetailsComponentProps = {
    formDetails: FormDetailsData;
    displayConfig: {
        showTitle: boolean;
        showIngress: boolean;
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
        showAddendums = true,
        showApplications = true,
        showComplaints = true,
        showIngress,
        showTitle,
    } = displayConfig;

    const { formNumbers, formType, ingress, title } = formDetails;

    const variations = formType.reduce((acc, cur) => {
        if (
            (cur._selected === 'addendum' && !showAddendums) ||
            (cur._selected === 'application' && !showApplications) ||
            (cur._selected === 'complaint' && !showComplaints)
        ) {
            return acc;
        }

        const variations = cur[cur._selected]?.variations;

        return variations ? [...acc, ...variations] : acc;
    }, []) as Variation[];

    const formNumberToShow =
        formNumberSelected &&
        formNumbers.find((formNumber) =>
            formNumber.toLowerCase().endsWith(formNumberSelected)
        );

    return (
        <div className={classNames(style.formDetails, className)}>
            {showTitle && title && (
                <Heading
                    size="medium"
                    level="3"
                    spacing={(!showIngress || !ingress) && !formNumbers}
                >
                    {title}
                </Heading>
            )}
            {formNumbers && (
                <Detail className={style.formNumbers}>
                    {formNumbers.map((formNumber, index) => (
                        <Fragment key={formNumber}>
                            {index > 0 && (
                                <span
                                    aria-hidden={true}
                                    className={style.separator}
                                >
                                    {'|'}
                                </span>
                            )}
                            <span
                                className={
                                    formNumber === formNumberToShow
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
            {showIngress && ingress && (
                <div className={style.ingressWrapper}>
                    <ParsedHtml htmlProps={ingress} />
                </div>
            )}
            {variations.length > 0 && (
                <div className={classNames(style.variationWrapper)}>
                    {variations.map((variation, index: number) => (
                        <FormDetailsButton
                            key={variation.label}
                            variation={variation}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
