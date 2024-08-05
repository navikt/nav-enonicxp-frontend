import { AlertBox } from 'components/_common/alertBox/AlertBox';
import styles from './InfoBox.module.scss';

type InfoBoxProps = {
    children: React.ReactNode;
};

export const InfoBox = ({ children }: InfoBoxProps) => {
    return (
        <AlertBox variant="info" size="small" inline={true} className={styles.infoBox}>
            {children}
        </AlertBox>
    );
};
