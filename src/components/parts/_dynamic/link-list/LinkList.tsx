import React from 'react';
import { DynamicLinkList } from '../../../../types/component-props/parts/link-list';
import { Lenkeliste } from '../../../_common/lenkeliste/Lenkeliste';
import { ContentList } from '../../../_common/content-list/ContentList';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import './LinkList.less';

export const LinkList = ({ config }: DynamicLinkList) => {
    if (!config?.list) {
        return 'Tom lenkeliste';
    }

    const { title, list } = config;
    const { _selected, contentList, linkList } = list;

    if (_selected === 'contentList') {
        return (
            <ContentList
                content={contentList?.target}
                maxItems={contentList?.numLinks}
                title={title}
            />
        );
    }

    if (_selected === 'linkList') {
        const links = linkList?.links?.map(getSelectableLinkProps);

        return <Lenkeliste tittel={title} lenker={links} />;
    }

    return null;
};
