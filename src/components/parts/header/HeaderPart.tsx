import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { ComponentEditorProps } from 'components/ComponentMapper';
import { HeadingTag, headingToLevel, headingToSize } from 'types/typo-style';
import { PartComponentProps, PartType } from 'types/component-props/parts';

export type PartConfigHeader = {
    title: string;
    anchorId: string;
    titleTag: HeadingTag;
};

export const HeaderPart = ({
    config,
    editorProps,
}: PartComponentProps<PartType.Header> & {
    editorProps?: ComponentEditorProps;
}) => {
    if (!config) {
        return null;
    }

    const { title, titleTag, anchorId } = config;

    if (!title) {
        return null;
    }

    const tag = titleTag || 'h3';
    const level = headingToLevel[tag];
    const size = headingToSize[tag];

    return (
        <Header level={level} size={size} anchorId={anchorId} editorProps={editorProps}>
            {title}
        </Header>
    );
};
