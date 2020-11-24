import React from 'react';
import { MainArticleProps } from 'types/content-types/main-article-props';
import { RegionProps } from '../../page-components/_dynamic/DynamicRegions';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from 'utils/paths';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { translator } from 'translations';
import { BEM } from 'utils/bem';
import { LinkItem, MenuListItemKey } from 'types/content-types/menuListItems';
import './MenuList.less';

export type MenuListProps = RegionProps & MainArticleProps;

export const MenuList = (props: MenuListProps) => {
    const bem = BEM('menu-list');
    const data = props.data;
    const language = props.language;
    const menuListItems = data?.menuListItems;
    const entries = menuListItems ? Object.entries(menuListItems) : [];
    const selected = menuListItems?._selected || [];
    const getLabel = translator('relatedContent', language);
    const filtered = entries.filter(([key]) =>
        selected.includes(key as MenuListItemKey)
    );

    if (entries.length === 0) {
        return null;
    }

    return (
        <div className={bem()}>
            {filtered.map(([key, LinkItem], i) => (
                <Ekspanderbartpanel
                    key={key}
                    apen={filtered.length === 1}
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
            ))}
        </div>
    );
};
