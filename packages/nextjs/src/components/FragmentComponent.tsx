import React from 'react';
import { ComponentType, FragmentComponentProps } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { EditorHelp } from '@/editor-tools/components/editor-help/EditorHelp';
import { ComponentMapper } from './ComponentMapper';

type Props = {
    componentProps: FragmentComponentProps;
    pageProps: ContentProps;
};

const _FragmentComponent = ({ componentProps, pageProps }: Props) => {
    if (!componentProps.fragment?.type) {
        return (
            <EditorHelp
                text={'Feil på fragmentet - forsøk å sette det inn på nytt'}
                globalWarningText={'Feil på fragment'}
                type={'error'}
            />
        );
    }

    return <ComponentMapper pageProps={pageProps} componentProps={componentProps.fragment} />;
};

export const FragmentComponent = ({ componentProps, pageProps }: Props) => {
    if (pageProps.editorView === 'edit') {
        const editorProps = {
            'data-portal-component-type': ComponentType.Fragment,
            'data-portal-component': componentProps.path,
        };

        return (
            <div {...editorProps}>
                <_FragmentComponent pageProps={pageProps} componentProps={componentProps} />
            </div>
        );
    }

    return <_FragmentComponent pageProps={pageProps} componentProps={componentProps} />;
};
