import { BodyShort, Heading, LinkPanel } from '@navikt/ds-react';
import { ContactPageHeader } from 'components/_common/headers/contactPageHeader/ContactPageHeader';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ContentType, ContentCommonProps } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { PictogramsProps } from 'types/content-props/pictograms';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { InternalLinkMixin } from 'types/component-props/_mixins';
import style from './ContactStepPage.module.scss';

export type ContactStepPageProps = ContentCommonProps & {
    type: ContentType.ContactStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        html: string;
        linkPanelsHeading: string;
        linkPanelsSubHeading: string;
        linkPanels: (InternalLinkMixin & { ingress?: string })[];
        backLink: InternalLinkMixin;
    };
};

export const ContactStepPage = (props: ContactStepPageProps) => {
    const { data } = props;
    const {
        title,
        illustration,
        textAboveTitle,
        html,
        linkPanelsHeading,
        linkPanelsSubHeading,
        linkPanels,
        backLink,
    } = data;

    return (
        <div className={style.contactStepPage}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <ContactPageHeader
                contentProps={{
                    data: {
                        title,
                        illustration,
                    },
                }}
                textAboveTitle={textAboveTitle}
                className={style.header}
            />
            <div className={style.content}>
                <ParsedHtml htmlProps={html} />

                {linkPanelsHeading && (
                    <Heading size="medium" level="2">
                        {linkPanelsHeading}
                    </Heading>
                )}
                {linkPanelsSubHeading && <BodyShort>{linkPanelsSubHeading}</BodyShort>}

                <ul className={style.linkPanels}>
                    {linkPanels.map((linkPanel, index) => (
                        <li key={index}>
                            <LinkPanel
                                as={LenkeBase}
                                href={linkPanel.target._path}
                                className={style.linkPanel}
                                // TODO finn utav analytics
                                // analyticsComponent={'mellomsteg'}
                                // analyticsLinkGroup={currentStepData.stepsHeadline}
                                // analyticsLabel={step.label}s
                            >
                                <LinkPanel.Title>
                                    {linkPanel.text ?? linkPanel.target.displayName}
                                </LinkPanel.Title>
                                {linkPanel.ingress && (
                                    <LinkPanel.Description>
                                        {linkPanel.ingress}
                                    </LinkPanel.Description>
                                )}
                            </LinkPanel>
                        </li>
                    ))}
                </ul>
            </div>
            <LenkeInline href={backLink.target._path} className={style.backLink}>
                {backLink.text ?? backLink.target.displayName}
            </LenkeInline>
        </div>
    );
};
