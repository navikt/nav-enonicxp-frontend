import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LinkSelectable } from 'types/component-props/_mixins';
import { LinkProps } from 'types/link-props';
import { InternalLinkData } from 'types/content-props/internal-link-props';
import { pageLanguageToLayerLanguage } from './languages';

const invalidLinkProps = {
    url: '/',
    text: 'Invalid link',
};

export const getInternalLinkUrl = (content: InternalLinkData) => {
    const targetPath = content?.target?._path;
    if (!targetPath) {
        return undefined;
    }

    const targetLanguage = content?.target?.language;
    const layerLocale = targetLanguage ? pageLanguageToLayerLanguage[targetLanguage] : undefined;
    const basePath = layerLocale ? `${targetPath}/${layerLocale}` : targetPath;

    const targetAnchorId = content.anchorId;
    if (!targetAnchorId) {
        return basePath;
    }

    return `${basePath}${targetAnchorId}`;
};

export const getUrlFromContent = (content: ContentProps) => {
    switch (content.type) {
        case ContentType.InternalLink: {
            return getInternalLinkUrl(content.data);
        }
        case ContentType.ExternalLink:
        case ContentType.Url: {
            return content.data?.url;
        }
        default: {
            return content._path;
        }
    }
};

export const getSelectableLinkProps = (link?: LinkSelectable): LinkProps => {
    if (!link) {
        return invalidLinkProps;
    }

    const { _selected } = link;
    if (_selected === 'internal') {
        const { internal } = link;

        if (!internal?.target) {
            return invalidLinkProps;
        }

        const url = getInternalLinkUrl(internal);
        if (!url) {
            return invalidLinkProps;
        }

        return {
            url,
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
