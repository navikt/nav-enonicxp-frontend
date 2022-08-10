import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LinkSelectable } from '../types/component-props/_mixins';
import { LinkProps } from '../types/link-props';
import { InternalLinkData } from '../types/content-props/internal-link-props';

const invalidLinkProps = {
    url: '/',
    text: 'Invalid link',
};

export const getInternalLinkUrl = (content: InternalLinkData) => {
    const targetPath = content.targetUrl;
    if (!targetPath) {
        return undefined;
    }

    const targetAnchorId = content.anchorId;
    if (!targetAnchorId) {
        return targetPath;
    }

    return `${targetPath}${targetAnchorId}`;
};

export const getUrlFromContent = (content: ContentProps) => {
    if (!content) {
        return '';
    }

    if (content.__typename === ContentType.InternalLink) {
        return getInternalLinkUrl(content.data);
    }
    if (
        content.__typename === ContentType.ExternalLink ||
        content.__typename === ContentType.Url
    ) {
        return content.data?.url;
    }
    return content._path;
};

export const getSelectableLinkProps = (link: LinkSelectable): LinkProps => {
    if (!link) {
        return invalidLinkProps;
    }

    const { _selected } = link;

    if (_selected === 'internal') {
        const { internal } = link;

        if (!internal?.target) {
            return invalidLinkProps;
        }

        console.log(internal);
        return {
            url: getInternalLinkUrl(internal),
            text: internal.text || internal.target.displayName,
        };
    }

    if (_selected === 'external') {
        const { external } = link;

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
