import { BodyLong, Heading } from '@navikt/ds-react';
import { FormDetailsData, Variation } from 'types/content-props/form-details';
import { FormDetailsVariation } from './FormDetailsVariation';

import styles from './FormDetails.module.scss';

type FormDetailsProps = {
    formDetails: FormDetailsData;
};

export const FormDetails = ({ formDetails }: FormDetailsProps) => {
    const { formType } = formDetails;

    const variations = (formDetails.formType[formType._selected]?.variations ||
        []) as Variation[];

    if (variations.length === 0) {
        return null;
    }

    return (
        <div className={styles.formDetails}>
            <Heading size="medium" level="3">
                {formDetails.title}
            </Heading>
            <BodyLong spacing>{formDetails.ingress}</BodyLong>
            <div className={styles.buttonContainer}>
                {variations.map((variation, index: number) => (
                    <FormDetailsVariation
                        key={variation.label}
                        variation={variation}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};
