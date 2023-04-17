import { Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { Variation } from 'types/content-props/form-details';

import styles from './FormDetailsVariation.module.scss';

type FormsListItemProps = {
    variation: Variation;
    index: number;
    direction: 'vertical' | 'horizontal';
};

export const FormDetailsVariation = (props: FormsListItemProps) => {
    const { variation, index, direction } = props;
    const { url, label } = variation;

    if (!url || label) {
        // url or label is not required in CS as some form details are ment to only contain informational text
        // via the form details title and ingress.
        return null;
    }

    const variant = index === 0 ? 'primary' : 'secondary';

    return (
        <div className={classNames(styles.variation, styles[direction])}>
            <Button as="a" className={styles.cta} variant={variant} href={url}>
                {label}
            </Button>
        </div>
    );
};
