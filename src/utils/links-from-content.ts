import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LinkSelectable } from '../types/component-props/_mixins';
import { LinkProps } from '../types/link-props';

const invalidLinkProps = {
    url: '/',
    text: 'Invalid link',
};

export const getUrlFromContent = (content: ContentProps) => {
    if (!content) {
        return '';
    }

    if (content.__typename === ContentType.InternalLink) {
        return content.data?.target?._path;
    }
    if (content.__typename === ContentType.ExternalLink) {
        return content.data?.url;
    }
    return content._path;
};

export const getSelectableLinkProps = (link: LinkSelectable): LinkProps => {
    if (!link) {
        return invalidLinkProps;
    }

    const { _selected, external, internal } = link;

    if (_selected === 'internal') {
        if (!internal?.target) {
            return invalidLinkProps;
        }

        return {
            url: getUrlFromContent(internal.target),
            text: internal.text || internal.target.displayName,
        };
    }

    if (_selected === 'external') {
        if (!external) {
            return invalidLinkProps;
        }

        return {
            url: external.url,
            text: external.text,
        };
    }

    return invalidLinkProps;
};
