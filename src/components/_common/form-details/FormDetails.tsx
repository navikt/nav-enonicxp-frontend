import { Heading } from '@navikt/ds-react';
import { FormDetailsData, Variation } from 'types/content-props/form-details';
import { FormDetailsVariation } from './FormDetailsVariation';
import classNames from 'classnames';

import { forceArray } from 'utils/arrays';
import { ParsedHtml } from '../parsed-html/ParsedHtml';

import styles from './FormDetails.module.scss';

type FormDetailsProps = {
    formDetails: FormDetailsData;
    displayConfig: {
        showTitle: boolean;
        showIngress: boolean;
        showAddendums: boolean;
        showApplications: boolean;
    };
};

export const FormDetails = ({
    formDetails,
    displayConfig,
}: FormDetailsProps) => {
    const { formType } = formDetails;
    const { showAddendums, showApplications, showTitle, showIngress } =
        displayConfig;

    const variations = forceArray(formDetails.formType).reduce((acc, cur) => {
        const variations = cur[cur._selected].variations || [];

        return [...acc, ...variations];
    }, []) as Variation[];

    const direction = variations.length === 0 ? 'vertical' : 'horizontal';

    return (
        <div className={styles.formDetails}>
            <Heading size="medium" level="3">
                {formDetails.title}
            </Heading>
            <div className={styles.ingressWrapper}>
                <ParsedHtml htmlProps={formDetails.ingress} />
            </div>
            <div
                className={classNames(
                    styles.variationWrapper,
                    styles[direction]
                )}
            >
                {variations.map((variation, index: number) => (
                    <FormDetailsVariation
                        key={variation.label}
                        variation={variation}
                        direction={direction}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};
