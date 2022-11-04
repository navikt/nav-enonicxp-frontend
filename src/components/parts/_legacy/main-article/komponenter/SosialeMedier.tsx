import React from 'react';
import { getInternalAbsoluteUrl } from '../../../../../utils/urls';
import { LenkeBase } from '../../../../_common/lenke/LenkeBase';
import { classNames } from '../../../../../utils/classnames';

// eslint does not understand bracket notation
// eslint-disable-next-line css-modules/no-unused-class
import style from './SosialeMedier.module.scss';

import { SocialMedia } from '../../../../../types/content-props/main-article-props';
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
    if (!social || social.length === 0) {
        return null;
    }

    const sosialMediaName = {
        linkedin: 'LinkedIn',
        facebook: 'Facebook',
        twitter: 'Twitter',
    };

    const socialMedia = social?.map((socialMediaType) => ({
        type: socialMediaType,
        text: `Del på ${sosialMediaName[socialMediaType]}`,
        href: getSocialmediaShareUrl(
            socialMediaType,
            displayName,
            getInternalAbsoluteUrl(contentPath)
        ),
    }));

    return (
        <div className={style.socialMedia}>
            <ul>
                {socialMedia.map((item) => (
                    <li key={item.type}>
                        <LenkeBase href={item.href} analyticsLabel={item.text}>
                            <span
                                className={classNames(
                                    style.shareSocial,
                                    style[item.type]
                                )}
                            >
                                {item.text}
                            </span>
                        </LenkeBase>
                    </li>
                ))}
            </ul>
        </div>
    );
};
