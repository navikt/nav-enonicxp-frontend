import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { translator } from 'translations';

import styles from './PressShortcuts.module.scss';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { getPublicPathname } from 'utils/urls';

type PressShortcutsProps = {
    page: PressLandingPageProps;
};

export const PressShortcuts = (props: PressShortcutsProps) => {
    const { language } = props.page;
    const { maxShortcutsCount } = props.page?.data;
    const getTranslations = translator('pressLanding', language);

    const shortcuts = props.page.data.shortcuts;
    if (!shortcuts) return null;
    const shortcutItems = shortcuts.data.sectionContents.slice(
        0,
        parseInt(maxShortcutsCount, 10) || 5
    );

    if (!shortcutItems || shortcutItems.length === 0) return null;

    console.log(shortcutItems);

    return (
        <div className={styles.pressShortcuts}>
            <div className={styles.content}>
                <Heading level={'2'} size={'large'}>
                    {getTranslations('pressShortcuts')}
                </Heading>
                <ul className={styles.shortcutList}>
                    {shortcutItems.map((shortcut, index) => {
                        return (
                            <li key={index}>
                                <LinkPanel
                                    href={getPublicPathname(shortcut)}
                                    className={styles.shortcutItem}
                                >
                                    {shortcut.displayName}
                                </LinkPanel>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
