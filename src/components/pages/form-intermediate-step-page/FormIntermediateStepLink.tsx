import React from 'react';
import { useRouter } from 'next/compat/router';
import { LinkPanel } from '@navikt/ds-react';
import { InfoBox } from 'components/_common/info-box/InfoBox';
import style from 'components/pages/form-intermediate-step-page/FormIntermediateStepPage.module.scss';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { FormIntermediateStep_StepLinkData } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPageState';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

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
    const router = useRouter();

    if (!href) {
        return <EditorHelp text={'Lenken mangler URL!'} />;
    }

    const clickHandler = isStepNavigation
        ? (e: React.MouseEvent) => {
              e.preventDefault();
              router?.push(href, undefined, { shallow: true });
          }
        : undefined;

    return (
        <>
            {languageDisclaimer && <InfoBox>{languageDisclaimer}</InfoBox>}
            <LinkPanel {...rest} as={LenkeBase} href={href} onClick={clickHandler}>
                <LinkPanel.Title>{label}</LinkPanel.Title>
                <LinkPanel.Description>{explanation}</LinkPanel.Description>
            </LinkPanel>
        </>
    );
};
