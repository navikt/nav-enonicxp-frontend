import React from 'react';
import { BEM } from 'utils/bem';
import {
    ContentType,
    ContentTypeSchema,
    GlobalPageSchema,
    PageData,
} from 'types/content-types/_schema';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkepanelNavNo from '../_common/lenkepanel/LenkepanelNavNo';
import './LinkPanels.less';
import { LinkPanelMock } from './LinkPanelsMock';

type TableData = {
    url: string;
    tittel: string;
    children?: string;
};

const getLinkData = (
    contentData: ContentTypeSchema | null
): TableData | null => {
    if (!contentData) {
        return null;
    }

    switch (contentData.__typename) {
        case ContentType.InternalLink:
            return {
                url: contentData.data.target._path,
                tittel: contentData.displayName,
            };
        case ContentType.ExternalLink:
            return {
                url: contentData.data.url,
                tittel: contentData.displayName,
                children: contentData.data.description,
            };
        case ContentType.TransportPage:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.data.ingress,
            };
        case ContentType.PageList:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.data.ingress,
            };
        case ContentType.MainArticle:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.data.ingress,
            };
        default:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.displayName,
            };
    }
};

export const LinkPanels = (props: GlobalPageSchema) => {
    const type = props.__typename;
    const data =
        type === ContentType.TemplatePage
            ? (LinkPanelMock as PageData)
            : props.data;

    const { tableContents } = data;
    const bem = BEM('link-panels');

    return (
        tableContents?.length > 0 && (
            <div className={bem()}>
                {tableContents.map((content) => {
                    const link = getLinkData(content);

                    return (
                        link && (
                            <LenkepanelNavNo
                                href={link.url}
                                separator={true}
                                tittel={link.tittel}
                                key={content._id}
                                className={`lenkepanel-vertical ${bem('item')}`}
                            >
                                <Normaltekst>{link.children}</Normaltekst>
                            </LenkepanelNavNo>
                        )
                    );
                })}
            </div>
        )
    );
};

export default LinkPanels;
