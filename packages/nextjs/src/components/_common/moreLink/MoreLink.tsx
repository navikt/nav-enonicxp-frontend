import { ArrowRightIcon } from '@navikt/aksel-icons';
import { LinkSelectable } from 'types/component-props/_mixins';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';

import styles from './MoreLink.module.scss';

type Props = {
    link: LinkSelectable;
    analyticsGroup?: string;
};

export const MoreLink = ( props: Props) => {
    if (!props.link) {
        return null;
    }

    const { text, url } = getSelectableLinkProps(props.link);

    return (
        <LenkeStandalone
            href={url}
            linkGroup={props.analyticsGroup}
            className={styles.moreLink}
            withChevron
        >
            <ArrowRightIcon aria-hidden={true} className={styles.arrow} />
            {text}
        </LenkeStandalone>
    );
};
