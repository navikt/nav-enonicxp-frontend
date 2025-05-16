import React from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { LinkPanel } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { FormIntermediateStep_StepLinkData } from 'components/pages/formIntermediateStepPage/useFormIntermediateStepPage';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LanguageDisclaimer } from 'components/_common/languageDisclaimer/LanguageDisclaimer';
import FormNumberTag from 'components/_common/formNumberTag/FormNumberTag';
import style from './FormIntermediateStepLink.module.scss';

type Props = Omit<FormIntermediateStep_StepLinkData, 'nextStep'> &
    Omit<React.ComponentProps<typeof LenkeBase>, 'children' | 'href'> & {
        analyticsComponent: string;
        analyticsLabel: string;
        formNumber?: string;
    };

export const FormIntermediateStepLink = ({
    label,
    explanation,
    languageDisclaimer,
    href,
    isStepNavigation,
    formNumber,
    analyticsComponent,
    analyticsLabel,
}: Props) => {
    if (!href) {
        return <EditorHelp text={'Lenken mangler URL!'} />;
    }

    return (
        <LinkPanel
            as={LenkeBase}
            className={style.linkPanel}
            href={href}
            analyticsComponent={analyticsComponent}
            analyticsLabel={analyticsLabel}
            shallow={isStepNavigation}
        >
            <div className={style.content}>
                <LinkPanel.Title>{label}</LinkPanel.Title>
                {explanation && <LinkPanel.Description>{explanation}</LinkPanel.Description>}
                {formNumber && <FormNumberTag formNumber={formNumber} />}
                {languageDisclaimer && (
                    <LanguageDisclaimer>{languageDisclaimer}</LanguageDisclaimer>
                )}
            </div>
            <ArrowRightIcon aria-hidden fontSize="1.25rem" className={style.arrowRightIcon} />
        </LinkPanel>
    );
};
