import { InformationSquareIcon } from '@navikt/aksel-icons';
import styles from './InfoBox.module.scss';
import { BodyShort } from '@navikt/ds-react';

type InfoBoxProps = {
    children: React.ReactNode;
};

export const InfoBox = ({ children }: InfoBoxProps) => {
    return (
        <div className={styles.infoBox}>
            <InformationSquareIcon />
            <BodyShort size="small" className={styles.text}>
                {children}
            </BodyShort>
        </div>
    );
};
