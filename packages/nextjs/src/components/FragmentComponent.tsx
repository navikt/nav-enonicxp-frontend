import React from 'react';
import { FragmentComponentProps } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ComponentEditorProps, ComponentMapper } from './ComponentMapper';

type Props = {
    componentProps: FragmentComponentProps;
    pageProps: ContentProps;
    editorProps?: ComponentEditorProps;
};

const NestedFragmentComponent = ({ componentProps, pageProps }: Props) => {
    if (!componentProps.fragment?.type) {
        return (
            <EditorHelp
                text={'Feil på fragmentet - forsøk å sette det inn på nytt'}
                globalWarningText={'Feil på fragment'}
                type={'error'}
            />
        );
    }

    return (
        <ComponentMapper
            pageProps={pageProps}
            componentProps={componentProps.fragment}
            isCustomNestedComponent={true}
        />
    );
};

export const FragmentComponent = ({ componentProps, pageProps, editorProps }: Props) => {
    if (editorProps) {
        return (
            <div {...editorProps}>
                <NestedFragmentComponent pageProps={pageProps} componentProps={componentProps} />
            </div>
        );
    }

    return <NestedFragmentComponent pageProps={pageProps} componentProps={componentProps} />;
};
