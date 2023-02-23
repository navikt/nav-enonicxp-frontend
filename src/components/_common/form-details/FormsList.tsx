import { BodyLong, Heading, Ingress } from '@navikt/ds-react';
import {
    ApplicationTypes,
    ComplaintTypes,
    FormDetailsData,
    FormType,
    Variation,
} from 'types/content-props/form-details';
import { FormsListItem } from './FormsListItem';

type FormsListProps = {
    formDetails: FormDetailsData;
    type: FormType;
};

type AllVariations = Variation<ApplicationTypes> | Variation<ComplaintTypes>;

export const FormsList = ({ formDetails, type }: FormsListProps) => {
    const { applicationVariations, complaintVariations } = formDetails;

    const variations =
        type === 'application' ? applicationVariations : complaintVariations;

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
                    type={type}
                />
            ))}
        </>
    );
};
