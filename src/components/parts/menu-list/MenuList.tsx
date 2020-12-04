import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { translator } from 'translations';
import { BEM } from 'utils/bem';
import { LinkItem, MenuListItemKey } from 'types/menu-list-items';
import { ContentType } from 'types/content-props/_content-common';
import { ContentProps } from 'types/content-props/_content-common';
import { isXpPath, xpPathToUrl } from 'utils/paths';
import './MenuList.less';
import { LenkeInline } from '../../_common/lenke/LenkeInline';

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

    return filtered?.length > 0 ? (
        <div className={bem()}>
            {filtered.map(([key, LinkItem]) => {
                const links = (LinkItem as LinkItem)?.links;
                const isShortcuts = key === MenuListItemKey.Shortcuts;
                const isPageList = __typename === ContentType.PageList;
                const isOpen = isShortcuts && isPageList;
                return links?.length > 0 ? (
                    <Ekspanderbartpanel
                        key={key}
                        apen={isOpen}
                        tittel={getLabel(key as MenuListItemKey) || key}
                        className={bem('panel')}
                    >
                        <ul>
                            {links?.map((link, i) => (
                                <li key={i}>
                                    <LenkeInline href={link.url}>
                                        {link.text}
                                    </LenkeInline>
                                </li>
                            ))}
                        </ul>
                    </Ekspanderbartpanel>
                ) : null;
            })}
        </div>
    ) : null;
};
