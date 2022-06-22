import { ShortcutCard } from 'components/_common/card/ShortcutCard';
import { Header } from 'components/_common/headers/Header';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { getPublicPathname } from 'utils/urls';

import style from './FrontpageShortcuts.module.scss';

export const FrontpageShortcuts = ({ config }: FrontpageShortcutsProps) => {
    const { shortcutList, title } = config;
    const { language } = usePageConfig();

    return (
        <div className={style.frontpageShortcuts}>
            <Header
                size="large"
                level="2"
                justify="left"
                className={style.header}
            >
                {title}
            </Header>
            <div className={style.shortcutList}>
                {shortcutList.map((item) => (
                    <ShortcutCard
                        link={{
                            text: item.displayName,
                            url: getPublicPathname(item),
                        }}
                        key={item._id}
                        className={style.shortcutItem}
                    />
                ))}
            </div>
        </div>
    );
};
