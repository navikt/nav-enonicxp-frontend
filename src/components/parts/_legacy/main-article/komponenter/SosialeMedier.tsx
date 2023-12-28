import React from 'react';
import { getInternalAbsoluteUrl } from 'utils/urls';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { SocialMedia } from 'types/content-props/main-article-props';
import { usePageConfig } from 'store/hooks/usePageConfig';

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

export const SosialeMedier = ({ social, contentPath, displayName }: Props) => {
    const { pageConfig } = usePageConfig();

    if (social.length === 0) {
        return null;
    }

    const linksData = social.reduce<LinkData[]>((acc, socialMediaType) => {
        const url = getSocialmediaShareUrl(
            socialMediaType,
            displayName,
            getInternalAbsoluteUrl(contentPath, !!pageConfig.editorView)
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
                    <li key={item.type}>
                        <LenkeBase
                            href={item.href}
                            analyticsLabel={item.text}
                            className={style.ikon}
                        >
                            <img alt={item.text} className={style[item.type]} />
                        </LenkeBase>
                    </li>
                ))}
            </ul>
        </section>
    );
};
