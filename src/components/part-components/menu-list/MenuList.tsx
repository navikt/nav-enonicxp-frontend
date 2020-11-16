import React from 'react';
import { MainArticleProps } from 'types/content-types/main-article-props';
import { RegionProps } from '../../page-components/_dynamic/DynamicRegions';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from 'utils/paths';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { translator } from 'translations';
import { BEM } from 'utils/bem';
import { MenuListItemKey } from '../../../types/content-types/menuListItems';
import './MenuList.less';

export type MenuListProps = RegionProps & MainArticleProps;

export const MenuList = (props: MenuListProps) => {
    if (!props.data?.menuListItems) {
        return null;
    }

    const getLabel = translator('relatedContent', props.language);

    const { selected, ...menuListItems } = props.data.menuListItems;
    const menuListKeys =
        menuListItems && (Object.keys(menuListItems) as MenuListItemKey[]);

    if (!menuListKeys || menuListKeys.length === 0) {
        return null;
    }

    const selectedList = selected || [];
    const bem = BEM('menu-list');

    return (
        <div className={bem()}>
            {menuListKeys
                .filter((key) => selectedList.includes(key))
                .map((key) => (
                    <Ekspanderbartpanel
                        key={key}
                        tittel={getLabel(key) || key}
                        className={bem('panel')}
                    >
                        <ul>
                            {menuListItems[key].link?.map((link) => {
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
