import React from 'react';
import { Lenkeliste, ListType } from 'components/_common/lenkeliste/Lenkeliste';
import { ContentList } from 'components/_common/content-list/ContentList';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { ComponentEditorProps } from 'components/ComponentMapper';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { OptionSetSingle } from 'types/util-types';
import { ContentListMixin, ExpandableMixin, LinkSelectable } from 'types/component-props/_mixins';

const getListComponent = (config: PartConfigLinkList, editorProps?: ComponentEditorProps) => {
    //TODO ikke dupliser ComponentEditorProps
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
                editorProps={editorProps}
            />
        );
    }

    if (_selected === 'linkList') {
        const { linkList } = list;
        const links = linkList?.links?.map(getSelectableLinkProps);
        return (
            <Lenkeliste
                tittel={hideTitle ? undefined : title}
                lenker={links}
                listType={listType}
                editorProps={editorProps}
            />
        );
    }

    return null;
};

export type PartConfigLinkList = {
    title?: string;
    hideTitle?: boolean;
    listType: ListType;
    list: OptionSetSingle<{
        contentList: ContentListMixin;
        linkList: {
            links: LinkSelectable[];
        };
    }>;
    editorProps?: ComponentEditorProps;
} & ExpandableMixin;

export const LinkListPart = ({
    config,
    editorProps,
}: PartComponentProps<PartType.LinkList> & {
    editorProps?: ComponentEditorProps;
}) => {
    if (!config?.list?._selected) {
        return <EditorHelp text={'Klikk og velg lenker i panelet til høyre'} />;
    }

    const ListComponent = getListComponent(config, editorProps);

    return ListComponent ? (
        <ExpandableComponentWrapper {...config} editorProps={editorProps}>
            {ListComponent}
        </ExpandableComponentWrapper>
    ) : null;
};
