import { BodyLong, Heading } from '@navikt/ds-react';
import {
    FormAddendumTypes,
    FormApplicationTypes,
    FormComplaintTypes,
    FormDetailsData,
    FormTypes,
    Variation,
} from 'types/content-props/form-details';
import { FormDetailsItem } from './FormDetailsItem';

import styles from './FormDetails.module.scss';

type FormDetailsProps = {
    formDetails: FormDetailsData;
};

type AllVariations =
    | Variation<FormApplicationTypes>
    | Variation<FormComplaintTypes>
    | Variation<FormAddendumTypes>;

export const FormDetails = ({ formDetails }: FormDetailsProps) => {
    const { formType } = formDetails;

    const variations =
        formDetails.formType[formType._selected]?.variations || [];

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
                {variations.map((variation: AllVariations, index: number) => (
                    <FormDetailsItem
                        key={variation.label}
                        variation={variation}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};
