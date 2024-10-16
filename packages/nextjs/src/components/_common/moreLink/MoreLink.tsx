import { ArrowRightIcon } from '@navikt/aksel-icons';
import { LinkSelectable } from 'types/component-props/_mixins';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';

import styles from './MoreLink.module.scss';

export const MoreLink = ({ link }: { link?: LinkSelectable }) => {
    if (!link) {
        return null;
    }

    const { text, url } = getSelectableLinkProps(link);

    return (
        <LenkeStandalone href={url} className={styles.moreLink} withChevron={false}>
            <ArrowRightIcon aria-hidden={true} className={styles.arrow} />
            {text}
        </LenkeStandalone>
    );
};
