import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { FormIntermediateStep_StepLinkData } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPage';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LanguageDisclaimer } from 'components/_common/languageDisclaimer/LanguageDisclaimer';
import FormNumberTag from 'components/_common/formNumberTag/FormNumberTag';

type Props = FormIntermediateStep_StepLinkData &
    Omit<React.ComponentProps<typeof LenkeBase>, 'children' | 'href'> & {
        formNumberStepData?: string;
    };

export const FormIntermediateStepLink = ({
    label,
    explanation,
    languageDisclaimer,
    href,
    isStepNavigation,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextStep,
    formNumberStepData,
    ...rest
}: Props) => {
    if (!href) {
        return <EditorHelp text={'Lenken mangler URL!'} />;
    }

    return (
        <LinkPanel {...rest} as={LenkeBase} href={href} shallow={isStepNavigation}>
            <LinkPanel.Title>{label}</LinkPanel.Title>
            {formNumberStepData && <FormNumberTag formNumber={formNumberStepData} />}
            <LinkPanel.Description>{explanation}</LinkPanel.Description>
            {languageDisclaimer && <LanguageDisclaimer>{languageDisclaimer}</LanguageDisclaimer>}
        </LinkPanel>
    );
};
