import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { translator } from 'translations';
import { BEM } from 'utils/classnames';
import { LinkItem, MenuListItemKey } from 'types/menu-list-items';
import { ContentType } from 'types/content-props/_content-common';
import { ContentProps } from 'types/content-props/_content-common';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import './RelatedInfo.less';

/*
    Render of XP part named menu-list
*/

export const RelatedInfo = (props: ContentProps) => {
    const bem = BEM('related-info');
    const { __typename } = props;
    const data = props.data;
    const language = props.language;
    const relatedInfoItems = data?.menuListItems;
    const entries = relatedInfoItems ? Object.entries(relatedInfoItems) : [];
    const selected = relatedInfoItems?._selected || [];
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
