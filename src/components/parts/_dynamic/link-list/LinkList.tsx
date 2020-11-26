import React from 'react';
import { DynamicLinkList } from '../../../../types/component-props/parts/link-list';
import { Lenkeliste } from '../../../_common/lenkeliste/Lenkeliste';
import { ContentList } from '../../../_common/content-list/ContentList';
import { getUrlFromContent } from '../../../../utils/url-from-content';
import './LinkList.less';

export const LinkList = ({ config }: DynamicLinkList) => {
    if (!config?.list) {
        return null;
    }

    const { title, list } = config;
    const { _selected, contentList, linkList } = list;

    if (_selected === 'contentList') {
        return (
            <ContentList
                content={contentList.target}
                maxItems={contentList.numLinks}
                title={title}
            />
        );
    }

    if (_selected === 'linkList') {
        const links = linkList.links.map((link) => {
            const { _selected, external, internal } = link;

            if (_selected === 'internal' && internal) {
                return {
                    url: getUrlFromContent(internal.target),
                    text: internal.text || internal.target.displayName,
                };
            }

            if (_selected === 'external' && external) {
                return {
                    url: external.url,
                    text: external.text,
                };
            }

            return null;
        });

        return <Lenkeliste tittel={title} lenker={links} />;
    }

    return null;
};
