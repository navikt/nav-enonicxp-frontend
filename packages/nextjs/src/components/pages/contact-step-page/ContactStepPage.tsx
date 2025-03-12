import React from 'react';

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

// Type for the entire data structure
// export interface StepsData {
//     steps: Step[];
//     title: string;
//     sortTitle: string;
//     illustration: string; // UUID reference to an illustration
//     customPath: string;
// }

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
    // console.log('internalContent', steps[0].nextStep?.internal?.internalContent);
    // console.log('steps', steps);

    return (
        <>
            <div className="contact-step-page">
                {illustration && (
                    <div className="illustration">{/* Render illustration component */}</div>
                )}

                {textAboveTitle && <div className="text-above-title">{textAboveTitle}</div>}

                <h1 className="title">{title}</h1>

                {html && (
                    <div className="html-content" dangerouslySetInnerHTML={{ __html: html }} />
                )}

                {steps && steps.length > 0 && (
                    <div className="steps-container">
                        <ul className="steps-list">
                            {steps.map((step, index) => (
                                <li key={index} className="step-item">
                                    <h2 className="step-title">{step.label}</h2>
                                    <p className="step-explanation">{step.explanation}</p>

                                    {step.nextStep._selected === 'external' &&
                                        step.nextStep.external && (
                                            <a
                                                href={step.nextStep.external.externalUrl}
                                                className="step-link external"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Gå til ekstern side
                                            </a>
                                        )}

                                    {step.nextStep._selected === 'internal' &&
                                        step.nextStep.internal && (
                                            <LenkeBase
                                                href={stripXpPathPrefix(
                                                    step.nextStep.internal?.internalContent._path
                                                )}
                                                className="step-link internal"
                                            >
                                                Gå til intern side
                                            </LenkeBase>
                                        )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

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
            </div>
        </>
    );
};
