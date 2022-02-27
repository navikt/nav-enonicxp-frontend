import React from 'react';
import { BEM, classNames } from 'utils/classnames';
import { DynamicLinkListProps } from '../../../types/component-props/parts/link-list';
import { Lenkeliste } from '../../_common/lenkeliste/Lenkeliste';
import { ContentList } from '../../_common/content-list/ContentList';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { ExpandableComponent } from '../../_common/expandable/ExpandableComponent';

const bem = BEM('link-list');

const getListComponent = (config: DynamicLinkListProps['config']) => {
    const { title, list, chevron } = config;
    const { _selected } = list;

    if (_selected === 'contentList') {
        const { contentList } = list;
        return (
            <ContentList
                content={contentList?.target}
                title={title}
                withChevron={chevron}
            />
        );
    }

    if (_selected === 'linkList') {
        const { linkList } = list;
        const links = linkList?.links?.map(getSelectableLinkProps);
        return (
            <Lenkeliste tittel={title} lenker={links} withChevron={chevron} />
        );
    }

    return null;
};

export const LinkList = ({ config }: DynamicLinkListProps) => {
    if (!config?.list) {
        return <h2>{'Tom lenkeliste'}</h2>;
    }

    const ListComponent = getListComponent(config);

    return ListComponent ? (
        <div className={classNames(bem())}>
            <ExpandableComponent {...config}>
                {ListComponent}
            </ExpandableComponent>
        </div>
    ) : null;
};
