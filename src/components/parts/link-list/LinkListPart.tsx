import React from 'react';
import { DynamicLinkListProps } from '../../../types/component-props/part-configs/link-list';
import { Lenkeliste } from '../../_common/lenkeliste/Lenkeliste';
import { ContentList } from '../../_common/content-list/ContentList';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

import style from './LinkList.module.scss';

const getListComponent = (config: DynamicLinkListProps['config']) => {
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

export const LinkListPart = ({ config }: DynamicLinkListProps) => {
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
