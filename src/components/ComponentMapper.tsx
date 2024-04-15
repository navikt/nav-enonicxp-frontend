import React from 'react';
import dynamic from 'next/dynamic';
import { ComponentProps, ComponentType } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { FragmentComponent } from './FragmentComponent';
import { AuthDependantRender } from './_common/auth-dependant-render/AuthDependantRender';
import { EditorHelp } from './_editor-only/editor-help/EditorHelp';
import { useXpComponentsConfig } from './xp-components/components-config/xpComponentsConfig';

const PartsMapperOld = dynamic(() =>
    import('components/parts/PartsMapper').then((module) => module.PartsMapper)
);
const LayoutMapperOld = dynamic(() =>
    import('components/layouts/LayoutMapper').then((module) => module.LayoutMapper)
);
const TextComponent = dynamic(() =>
    import('components/parts/_text/TextComponentXp').then((module) => module.TextComponentXp)
);

type Props = {
    componentProps?: ComponentProps;
    pageProps: ContentProps;
};

const ComponentFallbackRender = ({ componentProps, pageProps }: Required<Props>) => {
    switch (componentProps.type) {
        case ComponentType.Text:
            return <TextComponent textProps={componentProps} editMode={!!pageProps.editorView} />;
        case ComponentType.Layout:
        case ComponentType.Page:
            return <LayoutMapperOld layoutProps={componentProps} pageProps={pageProps} />;
        case ComponentType.Part:
            return <PartsMapperOld partProps={componentProps} pageProps={pageProps} />;
        case ComponentType.Fragment:
            return <FragmentComponent componentProps={componentProps} pageProps={pageProps} />;
        default:
            return <div>{`Unimplemented component type: ${(componentProps as any).type}`}</div>;
    }
};

const ComponentToRender = ({ componentProps, pageProps }: Required<Props>) => {
    const { parts, layouts, pages, useGlobalFallback } = useXpComponentsConfig();

    if (componentProps.type === ComponentType.Part) {
        const Component = parts[componentProps.descriptor];
        if (Component) {
            return <Component {...componentProps} />;
        }
    } else if (componentProps.type === ComponentType.Layout) {
        const Component = layouts[componentProps.descriptor];
        if (Component) {
            return <Component {...componentProps} />;
        }
    } else if (componentProps.type === ComponentType.Page) {
        const Component = pages[componentProps.descriptor];
        if (Component) {
            return <Component {...componentProps} />;
        }
    }

    return useGlobalFallback || componentProps.type !== ComponentType.Part ? (
        <ComponentFallbackRender pageProps={pageProps} componentProps={componentProps} />
    ) : (
        <EditorHelp
            text={`Komponenten "${componentProps.descriptor} [${componentProps.type}]" kan ikke benyttes på sidetypen "${pageProps.type}"`}
        />
    );
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    if (!componentProps) {
        return (
            <EditorHelp
                type={'error'}
                text={
                    'Kunne ikke laste komponent-data - Forsøk å reloade siden (F5), eller fjern komponenten og legg til på nytt'
                }
            />
        );
    }

    return (
        <AuthDependantRender renderOn={componentProps?.config?.renderOnAuthState}>
            <ComponentToRender componentProps={componentProps} pageProps={pageProps} />
        </AuthDependantRender>
    );
};
