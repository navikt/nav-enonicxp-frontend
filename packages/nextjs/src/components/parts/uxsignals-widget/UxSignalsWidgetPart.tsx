import React from 'react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { UxSignalsWidget } from 'components/_common/uxsignalsWidget/UxSignalsWidget';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';

export type PartConfigUxSignalsWidget = {
    embedCode: string;
};

export const UxSignalsWidgetPart = ({ config }: PartComponentProps<PartType.UxSignalsWidget>) => {
    const { editorView } = usePageContentProps();
    if (!config?.embedCode) {
        return (
            <EditorHelp text={'Tom UXSignals komponent, sett inn en embed-kode'} type={'error'} />
        );
    }

    const cookieInformation =
        editorView === 'edit' ? (
            <EditorHelp
                text={
                    'Merk! For å se undersøkelsen fra UX Signal i forhåndsvisningen i Enonic, må du samtykke til bruk av informasjonskapsler på nav.no. Du kan endre samtykke for informasjonskapsler på i footeren.'
                }
                type={'info'}
            />
        ) : null;

    return (
        <>
            {cookieInformation}
            <UxSignalsWidget embedCode={config.embedCode} />
        </>
    );
};
