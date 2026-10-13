import { ButtonProps } from '@navikt/ds-react';
import { Variation } from 'types/content-props/skjemadetaljer';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Knapp } from 'components/_common/knapp/Knapp';

import styles from './SkjemadetaljerButton.module.scss';

type FormsListItemProps = {
    variation: Variation;
};

type Variant = ButtonProps['variant'];

export const SkjemadetaljerButton = (props: FormsListItemProps) => {
    const { variation } = props;
    const { link, label, type } = variation;

    if (!link || !label) {
        // url or label is not required in CS as some form details are ment to only contain informational text
        // via the form details title and ingress.
        return null;
    }

    const { url } = getSelectableLinkProps(link);

    const variant = type as Variant;

    return (
        <Knapp className={styles.button} href={url} variant={variant}>
            {label}
        </Knapp>
    );
};
