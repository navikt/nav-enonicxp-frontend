import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, LinkPanel } from '@navikt/ds-react';
import { HeaderWithParent } from 'components/_common/headers/headerWithParent/HeaderWithParent';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ContentType, ContentCommonProps } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { PictogramsProps } from 'types/content-props/pictograms';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { InternalLinkMixin } from 'types/component-props/_mixins';
import style from './ContactStepPage.module.scss';

export type ContactStepPageProps = Pick<ContentCommonProps, '_path'> & {
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

export const ContactStepPage = ({ data }: ContactStepPageProps) => {
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
        <article className={style.contactStepPage}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <HeaderWithParent
                contentProps={{ data: { title, illustration } }}
                textAboveTitle={textAboveTitle}
                className={style.header}
            />
            <div className={style.content}>
                <ParsedHtml htmlProps={html} />

                {linkPanelsHeading && (
                    <Heading size="medium" level="2" spacing>
                        {linkPanelsHeading}
                    </Heading>
                )}
                {linkPanelsSubHeading && <BodyShort>{linkPanelsSubHeading}</BodyShort>}

                <ul className={style.linkPanels}>
                    {linkPanels.map((linkPanel, index) => {
                        const linkPaneltitle = linkPanel.text ?? linkPanel.target.displayName;

                        return (
                            <li key={index}>
                                <LinkPanel
                                    as={LenkeBase}
                                    href={linkPanel.target._path}
                                    className={style.linkPanel}
                                    analyticsComponent={'ContactStepPage'}
                                    analyticsLabel={linkPaneltitle}
                                >
                                    <div>
                                        <LinkPanel.Title>{linkPaneltitle}</LinkPanel.Title>
                                        {linkPanel.ingress && (
                                            <LinkPanel.Description>
                                                {linkPanel.ingress}
                                            </LinkPanel.Description>
                                        )}
                                    </div>
                                    <ArrowRightIcon
                                        aria-hidden
                                        fontSize="1.25rem"
                                        className={style.arrowRightIcon}
                                    />
                                </LinkPanel>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <LenkeInline
                href={backLink.target._path}
                className={style.backLink}
                analyticsComponent={'ContactStepPage'}
            >
                {backLink.text ?? backLink.target.displayName}
            </LenkeInline>
        </article>
    );
};
