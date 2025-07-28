import { PropsWithChildren } from 'react';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
import styles from './InfoBox.module.scss';

export const InfoBox = ({ children }: PropsWithChildren) => {
    return (
        <Varselboks variant="info" size="small" inline={true} className={styles.infoBox}>
            {children}
        </Varselboks>
    );
};
