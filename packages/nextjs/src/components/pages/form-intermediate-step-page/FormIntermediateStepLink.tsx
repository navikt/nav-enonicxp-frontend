import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { InfoBox } from 'components/_common/infoBox/InfoBox';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { FormIntermediateStep_StepLinkData } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPageState';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

type Props = FormIntermediateStep_StepLinkData &
    Omit<React.ComponentProps<typeof LenkeBase>, 'children' | 'href'>;

export const FormIntermediateStepLink = ({
    label,
    explanation,
    languageDisclaimer,
    href,
    isStepNavigation,
    ...rest
}: Props) => {
    if (!href) {
        return <EditorHelp text={'Lenken mangler URL!'} />;
    }

    return (
        <>
            {languageDisclaimer && <InfoBox>{languageDisclaimer}</InfoBox>}
            <LinkPanel {...rest} as={LenkeBase} href={href} shallow={isStepNavigation}>
                <LinkPanel.Title>{label}</LinkPanel.Title>
                <LinkPanel.Description>{explanation}</LinkPanel.Description>
            </LinkPanel>
        </>
    );
};
