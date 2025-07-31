import { Variation } from 'types/content-props/skjemadetaljer';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Button } from 'components/_common/button/Button';

import styles from './SkjemadetaljerButton.module.scss';

type FormsListItemProps = {
    variation: Variation;
};

export const SkjemadetaljerButton = (props: FormsListItemProps) => {
    const { variation } = props;
    const { link, label } = variation;

    if (!link || !label) {
        // url or label is not required in CS as some form details are ment to only contain informational text
        // via the form details title and ingress.
        return null;
    }

    const { url } = getSelectableLinkProps(link);

    return (
        <Button className={styles.button} href={url}>
            {label}
        </Button>
    );
};
