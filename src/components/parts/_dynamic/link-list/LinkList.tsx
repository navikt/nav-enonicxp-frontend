import React from 'react';
import { DynamicLinkListProps } from '../../../../types/component-props/parts/link-list';
import { Lenkeliste } from '../../../_common/lenkeliste/Lenkeliste';
import { ContentList } from '../../../_common/content-list/ContentList';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { Collapsable } from '../../../_common/collapsable/Collapsable';
import './LinkList.less';

const getListComponent = (config: DynamicLinkListProps['config']) => {
    const { title, list } = config;
    const { _selected, contentList, linkList } = list;

    if (_selected === 'contentList') {
        return <ContentList content={contentList?.target} title={title} />;
    }

    if (_selected === 'linkList') {
        const links = linkList?.links?.map(getSelectableLinkProps);
        return <Lenkeliste tittel={title} lenker={links} />;
    }

    return null;
};

export const LinkList = ({ config }: DynamicLinkListProps) => {
    if (!config?.list) {
        return <h2>{'Tom lenkeliste'}</h2>;
    }

    const ListComponent = getListComponent(config);

    return ListComponent ? (
        <Collapsable {...config}>{ListComponent}</Collapsable>
    ) : null;
};
