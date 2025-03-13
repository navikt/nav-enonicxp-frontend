import React from 'react';

import { BodyShort, Heading, LinkPanel } from '@navikt/ds-react';
import { ContactPageHeader } from 'components/_common/headers/contactPageHeader/ContactPageHeader';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ContentType, ContentCommonProps } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { PictogramsProps } from 'types/content-props/pictograms';
import { stripXpPathPrefix } from 'utils/urls';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import style from './ContactStepPage.module.scss';

export type LinkInternal = {
    external?: never;
    internal: { internalContent: Pick<ContentCommonProps, '_path'> };
    _selected: 'internal';
};

export type LinkExternal = {
    external: { externalUrl: string };
    internal?: never;
    _selected: 'external';
};

export type Link = LinkInternal | LinkExternal;

export interface LinkPanel {
    label: string;
    explanation: string;
    link: Link;
}

export type ContactStepPageProps = ContentCommonProps & {
    type: ContentType.ContactStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        html: string;
        linksHeading: string;
        linksSubHeadline: string;
        links: LinkPanel[];
    };
};

const getHref = (link: Link) => {
    if (link._selected === 'internal') {
        return stripXpPathPrefix(link.internal?.internalContent._path);
    }
    return link.external.externalUrl;
};

export const ContactStepPage = (props: ContactStepPageProps) => {
    const { data } = props;
    const { title, illustration, textAboveTitle, html, links, linksHeading, linksSubHeadline } =
        data;

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
            {linksHeading && (
                <Heading size="medium" level="2">
                    {linksHeading}
                </Heading>
            )}
            {linksSubHeadline && <BodyShort>{linksSubHeadline}</BodyShort>}
            {links && links.length > 0 && (
                <ul className={style.links}>
                    {links.map((linkPanel, index) => (
                        <li key={index}>
                            <LinkPanel
                                as={LenkeBase}
                                href={getHref(linkPanel.link)}
                                className={style.linkPanel}
                                // TODO finn utav analytics
                                // analyticsComponent={'mellomsteg'}
                                // analyticsLinkGroup={currentStepData.stepsHeadline}
                                // analyticsLabel={step.label}s
                            >
                                <LinkPanel.Title>{linkPanel.label}</LinkPanel.Title>
                                <LinkPanel.Description>
                                    {linkPanel.explanation}
                                </LinkPanel.Description>
                            </LinkPanel>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
