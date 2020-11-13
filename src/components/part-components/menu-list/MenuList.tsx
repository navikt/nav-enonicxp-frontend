import React from 'react';
import { MainArticleProps } from 'types/content-types/main-article-props';
import { RegionProps } from '../../page-components/_dynamic/DynamicRegions';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from 'utils/paths';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {translator} from 'translations'
import { BEM } from 'utils/bem';
import './MenuList.less';

export type MenuListProps = RegionProps & MainArticleProps;

export const MenuList = (props: MenuListProps) => {
    const getLabel = translator('relatedContent', props.language);
    const menuListItems = props.data?.menuListItems
        ? Object.entries(props.data?.menuListItems)
        : [];

    const selectedList = props.data?.menuListItems?.selected || [];
    const bem = BEM('menu-list');

    if (menuListItems.length === 0) {
        return null;
    }

    return (
        <div className={bem()}>
            {menuListItems
                .filter(([key]) => selectedList.includes(key))
                .map(([key, menuItem]) => (
                    <Ekspanderbartpanel
                        key={key}
                        tittel={getLabel(key) || key}
                        className={bem('panel')}
                    >
                        <ul>
                            {menuItem.link?.map((link) => {
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
