import React from 'react';
import {
    ComponentProps,
    ComponentType,
} from 'types/component-props/_component-common';
import { TextComponentXp } from './parts/_text/TextComponentXp';
import { ImageComponentXp } from './parts/_image/ImageComponent';
import { PartsMapper } from './parts/PartsMapper';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutMapper } from './layouts/LayoutMapper';
import { FragmentComponent } from './FragmentComponent';
import { AuthDependantRender } from './_common/auth-dependant-render/AuthDependantRender';
import { EditorHelp } from './_editor-only/editor-help/EditorHelp';
import { ErrorBoundary } from 'components/_common/error-boundary/ErrorBoundary';
import { translator } from 'translations';
import { AlertBox } from 'components/_common/alert-box/AlertBox';

type Props = {
    componentProps: ComponentProps;
    pageProps: ContentProps;
};

export const ComponentToRender = ({ componentProps, pageProps }: Props) => {
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

    switch (componentProps.type) {
        case ComponentType.Text:
            return (
                <TextComponentXp
                    textProps={componentProps}
                    editMode={!!pageProps.editorView}
                />
            );
        case ComponentType.Image:
            return (
                <ImageComponentXp
                    imageProps={componentProps}
                    editMode={!!pageProps.editorView}
                />
            );
        case ComponentType.Layout:
        case ComponentType.Page:
            return (
                <LayoutMapper
                    layoutProps={componentProps}
                    pageProps={pageProps}
                />
            );
        case ComponentType.Part:
            return (
                <PartsMapper partProps={componentProps} pageProps={pageProps} />
            );
        case ComponentType.Fragment:
            return (
                <FragmentComponent
                    componentProps={componentProps}
                    pageProps={pageProps}
                />
            );
        default:
            return (
                <div>{`Unimplemented component type: ${
                    (componentProps as any).type
                }`}</div>
            );
    }
};

const ErrorFallback = ({ componentProps, pageProps }: Props) => {
    const { editorView, language } = pageProps;
    const { type, path } = componentProps;

    const descriptorText =
        type === 'part' || type === 'layout'
            ? ` av type "${componentProps.descriptor}"`
            : '';

    return !!editorView ? (
        <EditorHelp
            type={'error'}
            text={`Komponenten "${path}"${descriptorText} kunne ikke rendres pga teknisk feil. Sjekk om komponenten er riktig konfigurert, eller kontakt brukerstøtte.`}
            globalWarningText={`Feil på ${type}-komponent${descriptorText}`}
        />
    ) : (
        <AlertBox variant={'error'} inline={true}>
            {translator('errors', language)('componentError')}
        </AlertBox>
    );
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    return (
        <ErrorBoundary
            fallback={
                <ErrorFallback
                    componentProps={componentProps}
                    pageProps={pageProps}
                />
            }
            editorView={pageProps.editorView}
        >
            <AuthDependantRender
                renderOn={componentProps?.config?.renderOnAuthState}
            >
                <ComponentToRender
                    componentProps={componentProps}
                    pageProps={pageProps}
                />
            </AuthDependantRender>
        </ErrorBoundary>
    );
};
