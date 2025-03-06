import { classNames } from 'utils/classnames';
import styles from './FallbackChevron.module.scss';

type FallbackChevronProps = {
    className?: string;
};

export const FallbackChevron = ({ className }: FallbackChevronProps) => {
    return (
        <div className={classNames(styles.fallbackChevron, className)}>
            <div className={classNames(styles.back, 'back')}>
                <svg
                    width="64"
                    height="64"
                    viewBox="17 17 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="48" cy="48" r="28" fill="#CCF1D6" />
                </svg>
            </div>
            <div className={classNames(styles.front, 'front')}>
                <svg
                    width="64"
                    height="64"
                    viewBox="17 17 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M59 48L42.7895 65L37 59.1379L47.4211 48L37 36.8621L42.7895 31L59 48Z"
                        stroke="#262626"
                        strokeWidth="2"
                    />
                </svg>
            </div>
        </div>
    );
};
