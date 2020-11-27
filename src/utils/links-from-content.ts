import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LinkSelectable } from '../types/component-props/_mixins';
import { LinkProps } from '../types/link-props';

export const getUrlFromContent = (content: ContentProps) => {
    if (content.__typename === ContentType.InternalLink) {
        return content.data?.target?._path;
    }
    if (content.__typename === ContentType.ExternalLink) {
        return content.data?.url;
    }
    return content._path;
};

export const getSelectableLinkProps = (link: LinkSelectable): LinkProps => {
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

    return {
        url: '/',
        text: 'Invalid link',
    };
};
