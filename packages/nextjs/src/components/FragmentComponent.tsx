import React, { useEffect, useState } from 'react';
import { FragmentComponentProps } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { classNames } from 'utils/classnames';
import { useIsEditorView } from 'store/hooks/useIsEditorView';
import { usePageContentProps } from 'store/pageContext';
import { ComponentEditorProps, ComponentMapper } from './ComponentMapper';
import { isGodkjentSide } from './_editor-only/redaktorvarsler/Redaktorvarsler';
import { pageContentFragmentUtenforInnholdsseksjon } from './_editor-only/redaktorvarsler/varsler/fragment-utenfor-innholdsseksjon/pageContentFragmentUtenforInnholdsseksjon';
import style from './FragmentComponent.module.scss';

type Props = {
    componentProps: FragmentComponentProps;
    pageProps: ContentProps;
    editorProps?: ComponentEditorProps;
};

const _FragmentComponent = ({ componentProps, pageProps }: Props) => {
    if (!componentProps.fragment?.type) {
        return (
            <EditorHelp
                text="Feil på fragmentet - forsøk å sette det inn på nytt"
                globalWarningText="Feil på fragment"
                type="error"
            />
        );
    }

    return (
        <ComponentMapper
            pageProps={pageProps}
            componentProps={componentProps.fragment}
            isCustomNestedComponent
        />
    );
};

export const FragmentComponent = ({ componentProps, pageProps, editorProps }: Props) => {
    const shouldWarn = pageContentFragmentUtenforInnholdsseksjon({
        path: componentProps.path,
        type: 'fragment',
    });

    const [redBorderStyling, setRedBorderStyling] = useState(false);
    const isEditorView = useIsEditorView();
    const { type } = usePageContentProps();

    useEffect(() => {
        if (shouldWarn && isEditorView && isGodkjentSide(type)) {
            setRedBorderStyling(true);
        }
    }, [shouldWarn, isEditorView, type]);

    if (editorProps) {
        return (
            <div {...editorProps} className={classNames(redBorderStyling && style.redBorder)}>
                <_FragmentComponent pageProps={pageProps} componentProps={componentProps} />
            </div>
        );
    }

    return <_FragmentComponent pageProps={pageProps} componentProps={componentProps} />;
};
