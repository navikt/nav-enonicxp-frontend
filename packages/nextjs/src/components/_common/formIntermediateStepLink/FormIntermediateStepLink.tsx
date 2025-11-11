import React from 'react';
import { LinkCard } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { FormIntermediateStep_StepLinkData } from 'components/pages/formIntermediateStepPage/useFormIntermediateStepPage';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { LanguageDisclaimer } from 'components/_common/languageDisclaimer/LanguageDisclaimer';
import { FormNumberTag } from 'components/_common/formNumberTag/FormNumberTag';
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
        <LinkCard arrowPosition="center" className={style.lenkepanel}>
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase
                        className={style.lenkebase}
                        href={href}
                        analyticsComponent={analyticsComponent}
                        analyticsLabel={analyticsLabel}
                        shallow={isStepNavigation}
                    >
                        {label}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            {explanation && <LinkCard.Description>{explanation}</LinkCard.Description>}
            {(formNumber || languageDisclaimer) && (
                <LinkCard.Footer>
                    {formNumber && (
                        <FormNumberTag className={style.metadata} formNumber={formNumber} />
                    )}
                    {languageDisclaimer && (
                        <LanguageDisclaimer className={style.metadata}>
                            {languageDisclaimer}
                        </LanguageDisclaimer>
                    )}
                </LinkCard.Footer>
            )}
        </LinkCard>
    );
};
