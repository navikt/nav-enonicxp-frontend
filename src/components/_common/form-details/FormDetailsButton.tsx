import { Variation } from 'types/content-props/form-details';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Button } from '../button/Button';

import styles from './FormDetailsButton.module.scss';

type FormsListItemProps = {
    variation: Variation;
    index: number;
};

export const FormDetailsButton = (props: FormsListItemProps) => {
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
        <Button className={styles.button} variant={variant} href={url}>
            {label}
        </Button>
    );
};
