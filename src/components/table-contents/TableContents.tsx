import React from 'react';
import { LenkepanelVertical } from '../../../components/lenkepanel/lenkepanel-vertical/LenkepanelVertical';
import { EnonicRef } from '../../../utils/enonic-ref';
import {
    ContentType,
    ContentTypeSchemas,
} from '../../../types/schemas/_schemas';
import { useContent } from '../../../hooks/useContent';

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
    tableContentIds: EnonicRef[];
    className: string;
};

export const TableContents = ({ tableContentIds, className }: Props) => {
    const tableData = useContent({ ids: tableContentIds });

    return tableData?.length ? (
        <div className={`${className}__table-contents`}>
            {tableData.map((content) => {
                const link = getLinkData(content);

                return (
                    link && (
                        <LenkepanelVertical
                            url={link.url}
                            tittel={link.tittel}
                            key={content._id}
                            className={`${className}__table-item`}
                        >
                            <>{link.children}</>
                        </LenkepanelVertical>
                    )
                );
            })}
        </div>
    ) : null;
};
