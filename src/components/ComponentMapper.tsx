import React from 'react';
import dynamic from 'next/dynamic';
import { BodyLong } from '@navikt/ds-react';
import { ComponentProps, ComponentType } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { FragmentComponent } from './FragmentComponent';
import { AuthDependantRender } from './_common/auth-dependant-render/AuthDependantRender';
import { EditorHelp } from './_editor-only/editor-help/EditorHelp';
import { useXpComponentsConfig } from './xp-components/xpComponentsConfig';
import { XpPartComponent } from './xp-components/part/XpPartComponent';

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
    contentProps: ContentProps;
};

const ComponentToRender = ({ componentProps, contentProps }: Required<Props>) => {
    switch (componentProps.type) {
        case ComponentType.Text:
            return (
                <TextComponent textProps={componentProps} editMode={!!contentProps.editorView} />
            );
        case ComponentType.Layout:
        case ComponentType.Page:
            return <LayoutMapperOld layoutProps={componentProps} pageProps={contentProps} />;
        case ComponentType.Part:
            return <XpPartComponent partProps={componentProps} />;
        case ComponentType.Fragment:
            return <FragmentComponent componentProps={componentProps} pageProps={contentProps} />;
        default:
            return <div>{`Unimplemented component type: ${(componentProps as any).type}`}</div>;
    }
};

export const ComponentMapper = ({ componentProps, contentProps }: Props) => {
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
            <ComponentToRender componentProps={componentProps} contentProps={contentProps} />
        </AuthDependantRender>
    );
};
