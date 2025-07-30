import { Detail } from '@navikt/ds-react';
import { PropsWithChildren } from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';
import pinIcon from '/public/gfx/pin-icon.svg';
import styles from './TagLine.module.scss';

export const TagLine = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.tagLine}>
            <div className={styles.wrapper}>
                <StaticImage imageData={pinIcon} className={styles.tagIcon} />
                <Detail className={styles.tagLabel}>{children}</Detail>
            </div>
        </div>
    );
};
