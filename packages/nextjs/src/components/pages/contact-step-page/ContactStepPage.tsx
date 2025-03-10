import React from 'react';
import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';
import { PictogramsProps } from 'types/content-props/pictograms';
import { ContactPageHeader } from 'components/_common/headers/contactPageHeader/ContactPageHeader';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';

export type ContactStepPageProps = ContentCommonProps & {
    type: ContentType.ContactStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        html: string;
    };
};

export const ContactStepPage = (props: ContactStepPageProps) => {
    const { data, type } = props;
    const { title, illustration, textAboveTitle, html } = data;

    return (
        <div>
            <ContactPageHeader
                pageProps={{
                    type,
                    data: {
                        title,
                        illustration,
                        textAboveTitle,
                    },
                }}
            />
            <ParsedHtml htmlProps={html} />

            {/* <ul>
                {currentStepData.steps.map((step) => (
                    <li key={step.label}>
                        <FormIntermediateStepLink
                            {...step}
                            analyticsComponent={'mellomsteg'}
                            analyticsLinkGroup={currentStepData.stepsHeadline}
                            analyticsLabel={step.label}
                        />
                    </li>
                ))}
            </ul> */}

            {/*        <ul className={style.stepList}>*/}
            {/*            {currentStepData.steps.map((step) => (*/}
            {/*                <li key={step.label} className={style.stepItem}>*/}
            {/*                    <FormIntermediateStepLink*/}
            {/*                        {...step}*/}
            {/*                        className={style.stepAction}*/}
            {/*                        analyticsComponent={'mellomsteg'}*/}
            {/*                        analyticsLinkGroup={currentStepData.stepsHeadline}*/}
            {/*                        analyticsLabel={step.label}*/}
            {/*                    />*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*    {backUrl && (*/}
            {/*        <div className={style.buttonGroup}>*/}
            {/*            <Button*/}
            {/*                href={backUrl}*/}
            {/*                shallow={true}*/}
            {/*                as={LenkeBase}*/}
            {/*                variant={'tertiary'}*/}
            {/*                className={style.backButton}*/}
            {/*                analyticsComponent={'mellomsteg'}*/}
            {/*                analyticsLinkGroup={currentStepData.stepsHeadline}*/}
            {/*                analyticsLabel={'Tilbake'}*/}
            {/*            >*/}
            {/*                {getTranslations('back')}*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};