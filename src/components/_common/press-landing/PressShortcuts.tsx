import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';

import styles from './PressShortcuts.module.scss';

type PressShortcutsProps = {
    page: PressLandingPageProps;
};

export const PressShortcuts = (props: PressShortcutsProps) => {
    return <div className={styles.pressShortcuts}>I am shortcut </div>;
};
