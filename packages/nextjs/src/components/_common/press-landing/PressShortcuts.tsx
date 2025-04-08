import { Heading, LinkPanel } from '@navikt/ds-react';
import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { translator } from 'translations';
import { getPublicPathname } from 'utils/urls';

import styles from './PressShortcuts.module.scss';

type PressShortcutsProps = {
    page: Pick<PressLandingPageProps, 'language' | 'data'>;
};

export const PressShortcuts = (props: PressShortcutsProps) => {
    const { language } = props.page;
    const getTranslations = translator('pressLanding', language);

    const shortcuts = props.page.data?.shortcuts;

    if (!shortcuts?.data?.sectionContents || shortcuts.data.sectionContents.length === 0) {
        return null;
    }

    return (
        <section className={styles.pressShortcuts}>
            <div className={styles.content}>
                <Heading level={'2'} size={'large'}>
                    {getTranslations('pressShortcuts')}
                </Heading>
                <ul className={styles.shortcutList}>
                    {shortcuts.data.sectionContents.map((shortcut) => {
                        return (
                            <li key={shortcut._path}>
                                <LinkPanel
                                    href={getPublicPathname({ _path: shortcut._path })}
                                    className={styles.shortcutItem}
                                >
                                    {shortcut.displayName}
                                </LinkPanel>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
