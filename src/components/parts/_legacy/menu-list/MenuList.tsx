import React from 'react';
import { Accordion } from '@navikt/ds-react';
import { translator } from 'translations';
import { LinkItem, MenuListItemKey } from 'types/menu-list-items';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';

import style from './MenuList.module.scss';

const validContentTypes = [
    ContentType.MainArticle,
    ContentType.MainArticleChapter,
    ContentType.PageList,
] as const;

type ValidContentType = (typeof validContentTypes)[number];

const isValidContentType = (type: ContentType): type is ValidContentType =>
    validContentTypes.includes(type as ValidContentType);

export const MenuList = (props: ContentProps) => {
    const { type, language } = props;

    if (!isValidContentType(type)) {
        return null;
    }

    const propsActual = type === ContentType.MainArticleChapter ? props.data?.article : props;

    if (!propsActual?.data?.menuListItems) {
        return null;
    }

    const getLabel = translator('relatedContent', language);

    const { _selected, ...menuListItems } = propsActual.data.menuListItems;
    const validItemKeys = _selected.filter((key) => !!menuListItems[key]?.links?.length);

    return (
        validItemKeys.length > 0 && (
            <div className={style.menuList}>
                {validItemKeys.map((key) => {
                    // We asserted previously that links are defined for items mapped from validItemKeys
                    const { links } = menuListItems[key] as Required<LinkItem>;
                    const isOpen =
                        key === MenuListItemKey.Shortcuts && type === ContentType.PageList;

                    return (
                        <Accordion key={key}>
                            <Accordion.Item defaultOpen={isOpen} className={style.panel}>
                                <Accordion.Header>{getLabel(key) || key}</Accordion.Header>
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
