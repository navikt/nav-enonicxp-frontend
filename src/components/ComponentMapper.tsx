import React from 'react';
import { ComponentProps, ComponentType } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { TextComponentXp } from './parts/_text/TextComponentXp';
import { PartsMapper } from './parts/PartsMapper';
import { LayoutMapper } from './layouts/LayoutMapper';
import { FragmentComponent } from './FragmentComponent';
import { AuthDependantRender } from './_common/authDependantRender/AuthDependantRender';
import { EditorHelp } from './_editor-only/editor-help/EditorHelp';

type Props = {
    componentProps?: ComponentProps;
    pageProps: ContentProps;
    // Must be set true if the component is not a part of the regular XP component tree structure
    // This prevents errors in the editor due to invalid editor props
    isCustomNestedComponent?: boolean;
};

export type ComponentEditorProps = {
    'data-portal-component-type': ComponentType;
    'data-portal-component': string;
};

const buildEditorProps = (componentProps: ComponentProps): ComponentEditorProps => ({
    'data-portal-component-type': componentProps.type,
    'data-portal-component': componentProps.path,
});

const ComponentToRender = ({ componentProps, pageProps, isCustomNestedComponent }: Props) => {
    if (!componentProps?.type) {
        return (
            <EditorHelp
                type={'error'}
                text={
                    'Kunne ikke laste komponent-data - Forsøk å reloade siden (F5), eller fjerne komponenten og legge til på nytt'
                }
            />
        );
    }

    const editorProps =
        !!pageProps.editorView && !isCustomNestedComponent
            ? buildEditorProps(componentProps)
            : undefined;

    switch (componentProps.type) {
        case ComponentType.Text:
            return <TextComponentXp textProps={componentProps} editorProps={editorProps} />;
        case ComponentType.Layout:
        case ComponentType.Page:
            return (
                <LayoutMapper
                    layoutProps={componentProps}
                    pageProps={pageProps}
                    editorProps={editorProps}
                />
            );
        case ComponentType.Part:
            return (
                <PartsMapper
                    partProps={componentProps}
                    pageProps={pageProps}
                    editorProps={editorProps}
                />
            );
        case ComponentType.Fragment:
            return (
                <FragmentComponent
                    componentProps={componentProps}
                    pageProps={pageProps}
                    editorProps={editorProps}
                />
            );
        default:
            return <div>{`Unimplemented component type: ${(componentProps as any).type}`}</div>;
    }
};

export const ComponentMapper = (props: Props) => {
    const { componentProps } = props;
    return (
        <AuthDependantRender renderOn={componentProps?.config?.renderOnAuthState}>
            <ComponentToRender {...props} />
        </AuthDependantRender>
    );
};
