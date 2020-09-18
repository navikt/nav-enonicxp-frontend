import React from 'react';
import { BEM } from '../../../utils/bem';
import {
    ContentType,
    ContentTypeSchemas,
} from '../../../types/schemas/_schemas';
import { LenkepanelVertical } from '../lenkepanel-vertical/LenkepanelVertical';
import { Normaltekst } from 'nav-frontend-typografi';

type TableData = {
    url: string;
    tittel: string;
    children?: string;
};

const getLinkData = (
    contentData: ContentTypeSchemas | null
): TableData | null => {
    if (!contentData) {
        return null;
    }

    switch (contentData.type) {
        case ContentType.ExternalLink:
            return {
                url: contentData.data.url,
                tittel: contentData.displayName,
                children: contentData.data.description,
            };
        case ContentType.TransportPage:
            return {
                url: contentData._path,
                tittel: contentData.data.title || contentData.displayName,
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

type Props = {
    tableContents: ContentTypeSchemas[];
    cssBlock: string;
};

export const TableContents = ({ tableContents, cssBlock }: Props) => {
    const bem = BEM(cssBlock);

    return (
        tableContents?.length > 0 && (
            <div className={bem('table-contents')}>
                {tableContents.map((content) => {
                    const link = getLinkData(content);

                    return (
                        link && (
                            <LenkepanelVertical
                                url={link.url}
                                tittel={link.tittel}
                                key={content._id}
                                className={bem('table-item')}
                            >
                                <Normaltekst>{link.children}</Normaltekst>
                            </LenkepanelVertical>
                        )
                    );
                })}
            </div>
        )
    );
};

export default TableContents;
