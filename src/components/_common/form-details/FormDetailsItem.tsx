import { Button } from '@navikt/ds-react';
import { Variation } from 'types/content-props/form-details';

import styles from './FormDetailsItem.module.scss';

type FormsListItemProps = {
    variation: Variation;
    index: number;
};

export const FormDetailsItem = (props: FormsListItemProps) => {
    const { variation, index } = props;

    const variant = index === 0 ? 'primary' : 'secondary';

    return (
        <Button
            as="a"
            className={styles.cta}
            variant={variant}
            href={variation.url}
        >
            {variation.label}
        </Button>
    );
};
