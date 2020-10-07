import React from 'react';
import { BEM } from 'utils/bem';
import { ContentTypeSchema } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { LenkepanelVertical } from '../lenkepanel-vertical/LenkepanelVertical';
import { Normaltekst } from 'nav-frontend-typografi';
import './TableContents.less';

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

type Props = {
    tableContents: ContentTypeSchema[];
};

export const TableContents = ({ tableContents }: Props) => {
    const bem = BEM('table-contents');

    return (
        tableContents?.length > 0 && (
            <div className={bem()}>
                {tableContents.map((content) => {
                    const link = getLinkData(content);

                    return (
                        link && (
                            <LenkepanelVertical
                                href={link.url}
                                tittel={link.tittel}
                                key={content._id}
                                className={bem('item')}
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
