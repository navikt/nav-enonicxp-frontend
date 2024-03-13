import React from 'react';
import { getInternalAbsoluteUrl } from 'utils/urls';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { SocialMedia } from 'types/content-props/main-article-props';
import { usePageContext } from 'store/pageContext';
import {
    hoverFocusIcon,
    useHoverAndFocus,
} from 'components/_common/contact-option/opening-info/helpers/iconUtils';

import style from './SosialeMedier.module.scss';

type LinkData = { type: string; text: string; href: string };

const sosialMediaName = {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    twitter: 'Twitter',
};

const getSocialmediaShareUrl = (
    socialMediaType: SocialMedia,
    displayName: string,
    requestUrl: string
) => {
    if (!requestUrl) {
        return null;
    }

    const shareUrl = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${requestUrl}&title=${displayName}`,
        twitter: `https://twitter.com/intent/tweet?text=${displayName}:${requestUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${requestUrl}&title=${displayName}&source=nav.no`,
    };

    return encodeURI(shareUrl[socialMediaType]) || null;
};

type Props = {
    social: SocialMedia[];
    displayName: string;
    contentPath: string;
};

const Icon = ({ type, text, href }) => {
    const { isActive, handlers } = useHoverAndFocus();

    return (
        <li>
            <LenkeBase
                href={href}
                analyticsLabel={text}
                className={style.ikon}
                {...handlers}
            >
                {hoverFocusIcon({
                    iconDefault: `${type}-filled.svg`,
                    iconActive: `${type}-inverted.svg`,
                    isActive: isActive,
                    altText: text,
                })}
            </LenkeBase>
        </li>
    );
};

export const SosialeMedier = ({ social, contentPath, displayName }: Props) => {
    const { editorView } = usePageContext();

    if (social.length === 0) {
        return null;
    }

    const linksData = social.reduce<LinkData[]>((acc, socialMediaType) => {
        const url = getSocialmediaShareUrl(
            socialMediaType,
            displayName,
            getInternalAbsoluteUrl(contentPath, !!editorView)
        );

        if (url) {
            acc.push({
                type: socialMediaType,
                text: `Del på ${sosialMediaName[socialMediaType]}`,
                href: url,
            });
        }

        return acc;
    }, []);

    return (
        <section className={style.socialMedia}>
            <ul>
                {linksData.map((item) => (
                    <Icon key={item.type} {...item} />
                ))}
            </ul>
        </section>
    );
};
