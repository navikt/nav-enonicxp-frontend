import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';

import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { FormDetailsData, Variation } from 'types/content-props/form-details';
import { FormDetailsButton } from './FormDetailsButton';

import styles from './FormDetails.module.scss';

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
};

export const FormDetails = ({
    formDetails,
    displayConfig,
    className,
}: FormDetailsComponentProps) => {
    const {
        showAddendums = true,
        showApplications = true,
        showComplaints = true,
        showTitle,
        showIngress,
    } = displayConfig;

    const variations = formDetails.formType.reduce((acc, cur) => {
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

    return (
        <div className={classNames(styles.formDetails, className)}>
            {showTitle && (
                <Heading size="medium" level="3" spacing={!showIngress}>
                    {formDetails.title}
                </Heading>
            )}
            {showIngress && (
                <div className={styles.ingressWrapper}>
                    <ParsedHtml htmlProps={formDetails.ingress} />
                </div>
            )}
            {variations.length > 0 && (
                <div className={classNames(styles.variationWrapper)}>
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
