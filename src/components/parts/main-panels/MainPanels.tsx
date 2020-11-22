import React from 'react';
import { BEM } from 'utils/bem';
import { GlobalPageProps, PageData } from 'types/content/_common';
import { ContentType, ContentTypeProps } from 'types/content/_common';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkepanelNavNo from '../_common/lenkepanel/LenkepanelNavNo';
import { MainPanelMock } from './MainPanelsMock';
import './MainPanels.less';

const ingressMaxLength = 140;

type TableData = {
    url: string;
    tittel: string;
    ingress?: string;
};

const getLinkData = (
    contentData: ContentTypeProps | null
): TableData | null => {
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
        default:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                ingress: '',
            };
    }
};

export const MainPanels = (props: GlobalPageProps) => {
    const type = props.__typename;
    const data =
        type === ContentType.TemplatePage
            ? (MainPanelMock as PageData)
            : props.data;

    const { tableContents } = data;
    const bem = BEM('link-panels');

    return (
        tableContents?.length > 0 && (
            <div className={bem()}>
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
                                className={`lenkepanel-vertical ${bem('item')}`}
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
            </div>
        )
    );
};

export default MainPanels;
