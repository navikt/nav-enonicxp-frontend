import { PropsWithChildren } from 'react';
import { AlertBox } from 'components/_common/alertBox/AlertBox';
import styles from './InfoBox.module.scss';

export const InfoBox = ({ children }: PropsWithChildren) => {
    return (
        <AlertBox variant="info" size="small" inline={true} className={styles.infoBox}>
            {children}
        </AlertBox>
    );
};
