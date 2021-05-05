import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { translator } from 'translations';
import { BEM } from 'utils/classnames';
import { MenuListItemKey } from 'types/menu-list-items';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import './MenuListPart.less';

const bem = BEM('menu-list');

export const MenuListPart = (props: ContentProps) => {
    const { __typename: type, language } = props;

    const propsActual =
        type === ContentType.MainArticleChapter ? props.data?.article : props;

    if (!propsActual?.data?.menuListItems) {
        return null;
    }

    const getLabel = translator('relatedContent', language);

    const { _selected, ...menuListItems } = propsActual.data.menuListItems;
    const selectedItems = _selected.filter(
        (item) => !!menuListItems[item]?.links
    );

    return (
        selectedItems.length > 0 && (
            <div className={bem()}>
                {selectedItems.map((key) => {
                    const { links } = menuListItems[key];
                    const isOpen =
                        key === MenuListItemKey.Shortcuts &&
                        type === ContentType.PageList;

                    return (
                        links.length > 0 && (
                            <Ekspanderbartpanel
                                key={key}
                                apen={isOpen}
                                tittel={getLabel(key) || key}
                                className={bem('panel')}
                            >
                                <ul>
                                    {links.map((link, i) => (
                                        <li key={i}>
                                            <LenkeInline href={link.url}>
                                                {link.text}
                                            </LenkeInline>
                                        </li>
                                    ))}
                                </ul>
                            </Ekspanderbartpanel>
                        )
                    );
                })}
            </div>
        )
    );
};
