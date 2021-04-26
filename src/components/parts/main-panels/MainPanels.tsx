import React from 'react';
import { BEM, classNames } from 'utils/classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkepanelNavNo from '../../_common/lenkepanel/LenkepanelNavNo';
import './MainPanels.less';
import { translator } from '../../../translations';

const ingressMaxLength = 140;

type TableData = {
    url: string;
    tittel: string;
    ingress?: string;
};

const getLinkData = (contentData: ContentProps | null): TableData | null => {
    if (!contentData) {
        return null;
    }

    switch (contentData.__typename) {
        case ContentType.InternalLink:
            return {
                url: contentData.data.target._path,
                tittel: contentData.displayName,
                ingress: contentData.data.description,
            };
        case ContentType.ExternalLink:
            return {
                url: contentData.data.url,
                tittel: contentData.displayName,
                ingress: contentData.data.description,
            };
        case ContentType.TransportPage:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                ingress: contentData.data.ingress,
            };
        case ContentType.PageList:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                ingress: contentData.data.ingress,
            };
        case ContentType.MainArticle:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                ingress: contentData.data.ingress,
            };
        case ContentType.SectionPage:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                ingress: contentData.data.ingress,
            };
        case ContentType.DynamicPage:
        case ContentType.PageWithSideMenus:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                ingress: contentData.data.description,
            };
        default:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                ingress: '',
            };
    }
};

export const MainPanels = (props: ContentProps) => {
    const tableContents = props.data?.tableContents;
    const getLabel = translator('mainPanels', props.language);
    const bem = BEM('link-panels');

    return (
        tableContents?.length > 0 && (
            <section className={bem()} aria-label={getLabel('label')}>
                {tableContents.map((content) => {
                    const { url, tittel, ingress } = getLinkData(content);

                    return (
                        url &&
                        tittel && (
                            <LenkepanelNavNo
                                href={url}
                                separator={true}
                                tittel={tittel}
                                key={content._id}
                                className={classNames(
                                    'lenkepanel-vertical',
                                    bem('item')
                                )}
                                component={'main-panels'}
                            >
                                {ingress && (
                                    <Normaltekst>
                                        {ingress.slice(0, ingressMaxLength)}
                                        {ingress.length > ingressMaxLength &&
                                            '...'}
                                    </Normaltekst>
                                )}
                            </LenkepanelNavNo>
                        )
                    );
                })}
            </section>
        )
    );
};

export default MainPanels;
