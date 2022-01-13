import React from 'react';
import { translator } from 'translations';
import { BEM } from 'utils/classnames';
import { MenuListItemKey } from 'types/menu-list-items';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import { Accordion } from '@navikt/ds-react';

const bem = BEM('menu-list');

export const MenuList = (props: ContentProps) => {
    const { __typename: type, language } = props;

    const propsActual =
        type === ContentType.MainArticleChapter ? props.data?.article : props;

    if (!propsActual?.data?.menuListItems) {
        return null;
    }

    const getLabel = translator('relatedContent', language);

    const { _selected, ...menuListItems } = propsActual.data.menuListItems;
    const validItemKeys = _selected.filter(
        (key) => !!menuListItems[key]?.links?.length
    );

    return (
        validItemKeys.length > 0 && (
            <div className={bem()}>
                {validItemKeys.map((key) => {
                    const { links } = menuListItems[key];
                    const isOpen =
                        key === MenuListItemKey.Shortcuts &&
                        type === ContentType.PageList;

                    return (
                        <Accordion key={key}>
                            <Accordion.Item
                                defaultOpen={isOpen}
                                className={bem('panel')}
                            >
                                <Accordion.Header>
                                    {getLabel(key) || key}
                                </Accordion.Header>
                                <Accordion.Content>
                                    <ul>
                                        {links.map((link, i) => (
                                            <li key={i}>
                                                <LenkeInline href={link.url}>
                                                    {link.text}
                                                </LenkeInline>
                                            </li>
                                        ))}
                                    </ul>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    );
                })}
            </div>
        )
    );
};
