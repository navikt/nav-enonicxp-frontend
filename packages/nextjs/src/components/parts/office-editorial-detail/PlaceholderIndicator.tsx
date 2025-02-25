import styles from './PlaceholderIndicator.module.scss';

type PlaceholderIndicatorProps = {
    children: React.ReactNode;
};

export const PlaceholderIndicator = ({ children }: PlaceholderIndicatorProps) => {
    return <div className={styles.placeholderIndicator}>{children}</div>;
};
