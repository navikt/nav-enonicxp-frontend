import { BodyLong, Button, Heading } from '@navikt/ds-react';
import {
    FormDetailsData,
    FormType,
    Variation,
} from 'types/content-props/form-details';

import styles from './FormsListItem.module.scss';

type FormsListItemProps = {
    formDetails: FormDetailsData;
    variation: Variation;
    type: FormType;
};

export const FormsListItem = (props: FormsListItemProps) => {
    const { formDetails, variation } = props;

    const variant =
        formDetails.formType === 'form' && variation.type === 'digital'
            ? 'primary'
            : 'secondary';

    return (
        <>
            <BodyLong spacing>{variation.ingress}</BodyLong>
            <Button
                as="a"
                className={styles.cta}
                variant={variant}
                href={variation.url}
            >
                {variation.label}
            </Button>
        </>
    );
};
