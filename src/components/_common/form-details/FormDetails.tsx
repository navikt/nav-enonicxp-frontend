import { BodyLong, Heading } from '@navikt/ds-react';
import { FormDetailsData, Variation } from 'types/content-props/form-details';
import { FormDetailsVariation } from './FormDetailsVariation';

import styles from './FormDetails.module.scss';
import classNames from 'classnames';
import { ParsedHtml } from '../parsed-html/ParsedHtml';

type FormDetailsProps = {
    formDetails: FormDetailsData;
};

export const FormDetails = ({ formDetails }: FormDetailsProps) => {
    const { formType } = formDetails;

    const variations = (formDetails.formType[formType._selected]?.variations ||
        []) as Variation[];

    const direction =
        formDetails.formType._selected === 'addendum'
            ? 'vertical'
            : 'horizontal';

    if (variations.length === 0) {
        return null;
    }

    return (
        <div className={styles.formDetails}>
            <Heading size="medium" level="3">
                {formDetails.title}
            </Heading>
            <BodyLong spacing>
                <ParsedHtml htmlProps={formDetails.ingress} />
            </BodyLong>
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
