import React from 'react';
import { xpPathToUrl } from 'utils/paths';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { translator } from 'translations';
import { BEM } from 'utils/bem';
import { LinkItem, MenuListItemKey } from 'types/menu-list-items';
import { ContentType } from 'types/content-props/_content-common';
import { ContentProps } from 'types/content-props/_content-common';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
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

    return filtered?.length > 0 ? (
        <div className={bem()}>
            {filtered.map(([key, LinkItem]) => {
                const links = (LinkItem as LinkItem)?.link;
                const files = (LinkItem as LinkItem)?.files;
                const isShortcuts = key === MenuListItemKey.Shortcuts;
                const isPageList = __typename === ContentType.PageList;
                const isOpen = isShortcuts && isPageList;
                return links?.length > 0 || files?.length > 0 ? (
                    <Ekspanderbartpanel
                        key={key}
                        apen={isOpen}
                        tittel={getLabel(key as MenuListItemKey) || key}
                        className={bem('panel')}
                    >
                        <ul>
                            {links?.map((link) => {
                                const path = xpPathToUrl(link._path);
                                return (
                                    <li key={path}>
                                        <LenkeInline href={path}>
                                            {link.displayName}
                                        </LenkeInline>
                                    </li>
                                );
                            })}
                            {files?.map((file) => (
                                <li key={file._path}>
                                    <LenkeInline href={file.mediaUrl}>
                                        {file.displayName}
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
