import { Button } from '@navikt/ds-react';
import { FormDetailsData, Variation } from 'types/content-props/form-details';

import styles from './FormsListItem.module.scss';

type FormsListItemProps = {
    formDetails: FormDetailsData;
    variation: Variation;
};

export const FormsListItem = (props: FormsListItemProps) => {
    const { formDetails, variation } = props;

    // Todo: Set first variation as primary
    const variant =
        formDetails.formType._selected === 'application' &&
        variation.type === 'digital'
            ? 'primary'
            : 'secondary';

    return (
        <>
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
