import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import LenkepanelNavNo from 'components/_common/lenkepanel-legacy/LenkepanelNavNo';
import { translator } from 'translations';
import { getInternalLinkUrl } from 'utils/links-from-content';

import style from './MainPanels.module.scss';

const INGRESS_MAX_LENGTH = 140;

type TableData = {
    tittel: string;
    url?: string;
    ingress?: string;
};

const getUrl = (content: ContentProps) => {
    switch (content.type) {
        case ContentType.InternalLink:
            return getInternalLinkUrl(content.data);
        case ContentType.ExternalLink:
            return content.data?.url;
        default:
            return content._path;
    }
};

const getLinkData = (content: ContentProps): TableData => {
    return {
        tittel: content.data?.title || content.displayName,
        ingress: content.data?.ingress || content.data?.description,
        url: getUrl(content),
    };
};

export const MainPanelsLegacyPart = (props: ContentProps) => {
    if (props.type !== ContentType.SectionPage) {
        return null;
    }

    const tableContents = props.data?.tableContents;
    if (!tableContents || tableContents.length === 0) {
        return null;
    }

    const getLabel = translator('mainPanels', props.language);

    return (
        <section className={style.mainPanels} aria-label={getLabel('label')}>
            {tableContents.map((content) => {
                const { url, tittel, ingress } = getLinkData(content);
                if (!url) {
                    return null;
                }

                return (
                    <LenkepanelNavNo
                        href={url}
                        separator={true}
                        vertikal={true}
                        tittel={tittel}
                        key={content._id}
                        className={style.item}
                        component={'main-panels'}
                    >
                        {ingress && (
                            <BodyLong>
                                {ingress.slice(0, INGRESS_MAX_LENGTH)}
                                {ingress.length > INGRESS_MAX_LENGTH && '...'}
                            </BodyLong>
                        )}
                    </LenkepanelNavNo>
                );
            })}
        </section>
    );
};
