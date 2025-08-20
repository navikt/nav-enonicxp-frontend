import { PropsWithChildren } from 'react';
import styles from './PlaceholderIndicator.module.scss';

export const PlaceholderIndicator = ({ children }: PropsWithChildren) => {
    return <div className={styles.placeholderIndicator}>{children}</div>;
};
