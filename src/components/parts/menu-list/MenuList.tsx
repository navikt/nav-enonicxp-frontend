import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from 'utils/paths';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { translator } from 'translations';
import { BEM } from 'utils/bem';
import { LinkItem, MenuListItemKey } from 'types/menu-list-items';
import { ContentType } from 'types/content-props/_content-common';
import { ContentProps } from 'types/content-props/_content-common';
import './MenuList.less';

export const MenuList = (props: ContentProps) => {
    const bem = BEM('menu-list');
    const { __typename } = props;
    const data = props.data;
    const language = props.language;
    const menuListItems = data?.menuListItems;
    const entries = menuListItems ? Object.entries(menuListItems) : [];
    const selected = menuListItems?._selected || [];
    const getLabel = translator('relatedContent', language);
    const filtered = entries.filter(([key]) =>
        selected.includes(key as MenuListItemKey)
    );

    if (filtered.length === 0) {
        return null;
    }

    return (
        <div className={bem()}>
            {filtered.map(([key, LinkItem]) => {
                const isShortcuts = key === MenuListItemKey.Shortcuts;
                const isPageList = __typename === ContentType.PageList;
                const isOpen = isShortcuts && isPageList;
                return (
                    <Ekspanderbartpanel
                        key={key}
                        apen={isOpen}
                        tittel={getLabel(key as MenuListItemKey) || key}
                        className={bem('panel')}
                    >
                        <ul>
                            {(LinkItem as LinkItem)?.link?.map((link) => {
                                const path = xpPathToAppPath(link._path);
                                return (
                                    <li key={path}>
                                        <Lenke href={path}>
                                            {link.displayName}
                                        </Lenke>
                                    </li>
                                );
                            })}
                        </ul>
                    </Ekspanderbartpanel>
                );
            })}
        </div>
    );
};
