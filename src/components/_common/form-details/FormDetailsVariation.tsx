import { Variation } from 'types/content-props/form-details';
import { getSelectableLinkProps } from 'utils/links-from-content';

import styles from './FormDetailsVariation.module.scss';
import { Button } from '../button/Button';

type FormsListItemProps = {
    variation: Variation;
    index: number;
};

export const FormDetailsVariation = (props: FormsListItemProps) => {
    const { variation, index } = props;
    const { link, label } = variation;

    if (!link || !label) {
        // url or label is not required in CS as some form details are ment to only contain informational text
        // via the form details title and ingress.
        return null;
    }

    const variant = index === 0 ? 'primary' : 'secondary';

    const { url } = getSelectableLinkProps(link);

    return (
        <div className={styles.variation}>
            <Button className={styles.cta} variant={variant} href={url}>
                {label}
            </Button>
        </div>
    );
};
