import type { ButtonProps } from '@navikt/ds-react';
import { Variation } from 'types/content-props/skjemadetaljer';
import { LinkSelectable } from 'types/component-props/_mixins';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Knapp } from 'components/_common/knapp/Knapp';

import styles from './SkjemadetaljerButton.module.scss';

export type ButtonVariation = Variation & { link: LinkSelectable; label: string };

// Link and label are optional in the CMS, as some form details only contain
// informational text via the title and ingress. Those variations get no button.
export const hasButton = (variation: Variation): variation is ButtonVariation =>
    !!variation.link && !!variation.label;

type Props = {
    variation: ButtonVariation;
    variant?: ButtonProps['variant'];
};

export const SkjemadetaljerButton = ({ variation, variant = 'secondary' }: Props) => {
    const { url } = getSelectableLinkProps(variation.link);

    return (
        <Knapp className={styles.button} href={url} variant={variant}>
            {variation.label}
        </Knapp>
    );
};
