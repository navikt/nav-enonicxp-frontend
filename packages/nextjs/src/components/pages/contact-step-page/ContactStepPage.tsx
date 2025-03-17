import { BodyShort, Heading, LinkPanel } from '@navikt/ds-react';
import { HeaderWithParent } from 'components/_common/headers/headerWithParent/HeaderWithParent';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ContentType, ContentCommonProps } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { PictogramsProps } from 'types/content-props/pictograms';
import { stripXpPathPrefix } from 'utils/urls';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import style from './ContactStepPage.module.scss';

type LinkInternal = {
    external?: never;
    internal: { internalContent: Pick<ContentCommonProps, '_path'> };
    _selected: 'internal';
};

type LinkExternal = {
    external: { externalUrl: string };
    internal?: never;
    _selected: 'external';
};

type Link = LinkInternal | LinkExternal;

interface LinkPanel {
    label: string;
    explanation?: string;
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
        link: {
            internal: {
                target: { _path: string };
                text: string;
            };
        };
    };
};

export const ContactStepPage = ({ data }: ContactStepPageProps) => {
    const {
        title,
        illustration,
        textAboveTitle,
        html,
        links: linkPanels,
        linksHeading: linksPanelHeading,
        linksSubHeadline: linksPanelSubHeadline,
        link,
    } = data;

    const getHref = (link: Link) => {
        return link._selected === 'internal'
            ? stripXpPathPrefix(link.internal?.internalContent._path)
            : link.external.externalUrl;
    };

    const { target, text } = link.internal;

    return (
        <div className={style.contactStepPage}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <HeaderWithParent
                contentProps={{ data: { title, illustration } }}
                textAboveTitle={textAboveTitle}
                className={style.header}
            />
            <div className={style.content}>
                <ParsedHtml htmlProps={html} />

                {linksPanelHeading && (
                    <Heading size="medium" level="2">
                        {linksPanelHeading}
                    </Heading>
                )}
                {linksPanelSubHeadline && <BodyShort>{linksPanelSubHeadline}</BodyShort>}
                {linkPanels && linkPanels.length > 0 && (
                    <ul className={style.linkPanels}>
                        {linkPanels.map((linkPanel, index) => (
                            <li key={index}>
                                <LinkPanel
                                    as={LenkeBase}
                                    href={getHref(linkPanel.link)}
                                    className={style.linkPanel}
                                >
                                    <LinkPanel.Title>{linkPanel.label}</LinkPanel.Title>
                                    {linkPanel.explanation && (
                                        <LinkPanel.Description>
                                            {linkPanel.explanation}
                                        </LinkPanel.Description>
                                    )}
                                </LinkPanel>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={style.link}>
                <LenkeInline href={target._path}>{text}</LenkeInline>
            </div>
        </div>
    );
};
