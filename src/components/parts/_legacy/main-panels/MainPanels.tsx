import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { BodyLong } from '@navikt/ds-react';
import LenkepanelNavNo from '../../../_common/lenkepanel-legacy/LenkepanelNavNo';
import { translator } from 'translations';
import { SectionPageProps } from 'types/content-props/section-page-props';
import { getInternalLinkUrl } from 'utils/links-from-content';

import style from './MainPanels.module.scss';

const ingressMaxLength = 140;

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

const getLinkData = (content: ContentProps): TableData | null => {
    return {
        tittel: content.displayName,
        ingress: content.data?.ingress || content.data?.description,
        url: getUrl(content),
    };
};

export const MainPanels = (props: SectionPageProps) => {
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
                                {ingress.slice(0, ingressMaxLength)}
                                {ingress.length > ingressMaxLength && '...'}
                            </BodyLong>
                        )}
                    </LenkepanelNavNo>
                );
            })}
        </section>
    );
};

export default MainPanels;
