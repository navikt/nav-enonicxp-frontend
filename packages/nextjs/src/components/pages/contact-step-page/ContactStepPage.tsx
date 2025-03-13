import React from 'react';

import { LinkPanel } from '@navikt/ds-react';
import { ContactPageHeader } from 'components/_common/headers/contactPageHeader/ContactPageHeader';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ContentType, ContentCommonProps } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { PictogramsProps } from 'types/content-props/pictograms';
import { stripXpPathPrefix } from 'utils/urls';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import style from './ContactStepPage.module.scss';

// Type for the external next step
export interface ExternalNextStep {
    externalUrl: string;
}

// Type for the internal next step
export interface InternalNextStep {
    internalContent: ContentCommonProps; // UUID reference to internal content
}

// Using discriminated unions for better type safety
export type NextStepExternal = {
    external: ExternalNextStep;
    internal?: never;
    _selected: 'external';
};

export type NextStepInternal = {
    external?: never;
    internal: InternalNextStep;
    _selected: 'internal';
};

// Union type for the next step
export type NextStep = NextStepExternal | NextStepInternal;

// Type for an individual step
export interface Step {
    label: string;
    explanation: string;
    nextStep: NextStep;
}

export type ContactStepPageProps = ContentCommonProps & {
    type: ContentType.ContactStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        html: string;
        steps: Step[];
    };
};

export const ContactStepPage = (props: ContactStepPageProps) => {
    const { data } = props;
    const { title, illustration, textAboveTitle, html, steps } = data;

    return (
        <div className={style.contactStepPage}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <div className={style.header}>
                <ContactPageHeader
                    contentProps={{
                        data: {
                            title,
                            illustration,
                        },
                    }}
                    textAboveTitle={textAboveTitle}
                />
            </div>
            <div className={style.content}>
                <ParsedHtml htmlProps={html} />
            </div>
            {steps && steps.length > 0 && (
                <ul className={style.steps}>
                    {steps.map((step, index) => (
                        <li key={index} className="step-item">
                            {step.nextStep._selected === 'internal' && step.nextStep.internal && (
                                <LinkPanel
                                    as={LenkeBase}
                                    href={stripXpPathPrefix(
                                        step.nextStep.internal?.internalContent._path
                                    )}
                                    className={style.linkPanel}
                                    // analyticsComponent={'mellomsteg'}
                                    // analyticsLinkGroup={currentStepData.stepsHeadline}
                                    // analyticsLabel={step.label}
                                    // shallow={isStepNavigation}
                                >
                                    <LinkPanel.Title>{step.label}</LinkPanel.Title>
                                    <LinkPanel.Description>
                                        {step.explanation}
                                    </LinkPanel.Description>
                                </LinkPanel>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
