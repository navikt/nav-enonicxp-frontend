import React from 'react';
import { DynamicLinkListProps } from '../../../types/component-props/parts/link-list';
import { Lenkeliste } from '../../_common/lenkeliste/Lenkeliste';
import { ContentList } from '../../_common/content-list/ContentList';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { Expandable } from '../../_common/expandable/Expandable';
import './LinkList.less';

const getListComponent = (config: DynamicLinkListProps['config']) => {
    const { title, list, chevron } = config;
    const { _selected, contentList, linkList } = list;

    if (_selected === 'contentList') {
        return <ContentList content={contentList?.target} title={title} />;
    }

    if (_selected === 'linkList') {
        const links = linkList?.links?.map(getSelectableLinkProps);
        return <Lenkeliste tittel={title} lenker={links} chevron={chevron} />;
    }

    return null;
};

export const LinkList = ({ config }: DynamicLinkListProps) => {
    if (!config?.list) {
        return <h2>{'Tom lenkeliste'}</h2>;
    }

    const ListComponent = getListComponent(config);

    return ListComponent ? (
        <Expandable {...config}>{ListComponent}</Expandable>
    ) : null;
};
