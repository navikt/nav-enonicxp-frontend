import React from 'react';
import { translator } from 'translations';
import { BEM } from 'utils/classnames';
import { MenuListItemKey } from 'types/menu-list-items';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Expandable } from '../../_common/expandable/Expandable';
import { Lenkeliste } from '../../_common/lenkeliste/Lenkeliste';
import { LenkeInline } from '../../_common/lenke/LenkeInline';

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
                        <Expandable
                            key={key}
                            expandableOpenByDefault={isOpen}
                            expandableTitle={getLabel(key) || key}
                            expandable={true}
                        >
                            {/*{links.map((link, index) => (*/}
                            {/*    <LenkeInline*/}
                            {/*        href={link.url}*/}
                            {/*        className={bem('link')}*/}
                            {/*        key={index}*/}
                            {/*    >*/}
                            {/*        {link.text}*/}
                            {/*    </LenkeInline>*/}
                            {/*))}*/}
                            <Lenkeliste lenker={links} withChevron={false} />
                        </Expandable>
                    );
                })}
            </div>
        )
    );
};
