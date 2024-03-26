import React from 'react';
import { Lenkeliste } from 'components/_common/lenkeliste/Lenkeliste';
import { ContentList } from 'components/_common/content-list/ContentList';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from 'types/component-props/parts';
import { PartConfigLinkList } from 'types/component-props/part-configs/link-list';

import style from './LinkList.module.scss';

const getListComponent = (config: PartConfigLinkList) => {
    const { title, list, listType, hideTitle } = config;
    const { _selected } = list;

    if (_selected === 'contentList') {
        const { contentList } = list;
        return (
            <ContentList
                content={contentList?.target}
                title={title}
                hideTitle={hideTitle}
                listType={listType}
            />
        );
    }

    if (_selected === 'linkList') {
        const { linkList } = list;
        const links = linkList?.links?.map(getSelectableLinkProps);
        return (
            <Lenkeliste
                tittel={!hideTitle ? title : undefined}
                lenker={links}
                listType={listType}
            />
        );
    }

    return null;
};

export const LinkListPart: PartComponent<PartType.LinkList> = ({ config }) => {
    if (!config?.list?._selected) {
        return <EditorHelp text={'Klikk og velg lenker i panelet til høyre'} />;
    }

    const ListComponent = getListComponent(config);

    return ListComponent ? (
        <div className={style.linkList}>
            <ExpandableComponentWrapper {...config}>
                {ListComponent}
            </ExpandableComponentWrapper>
        </div>
    ) : null;
};
