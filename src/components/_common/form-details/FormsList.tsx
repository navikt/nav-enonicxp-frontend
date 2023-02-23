import { BodyLong, Heading, Ingress } from '@navikt/ds-react';
import {
    FormApplicationTypes,
    FormComplaintTypes,
    FormDetailsData,
    Variation,
} from 'types/content-props/form-details';
import { FormsListItem } from './FormsListItem';

type FormsListProps = {
    formDetails: FormDetailsData;
};

type AllVariations =
    | Variation<FormApplicationTypes>
    | Variation<FormComplaintTypes>;

export const FormsList = ({ formDetails }: FormsListProps) => {
    const { formType } = formDetails;

    const variations =
        formType._selected === 'application'
            ? formType.application.variations
            : formType.complaint.variations;

    if (variations.length === 0) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                {formDetails.title}
            </Heading>
            <BodyLong spacing>{formDetails.ingress}</BodyLong>
            {variations.map((variation: AllVariations) => (
                <FormsListItem
                    key={variation.label}
                    formDetails={formDetails}
                    variation={variation}
                />
            ))}
        </>
    );
};
