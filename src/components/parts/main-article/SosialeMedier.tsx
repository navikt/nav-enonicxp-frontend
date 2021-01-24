import * as React from 'react';
import { xpPathToUrl } from '../../../utils/paths';
import { LenkeUstylet } from '../../_common/lenke/LenkeUstylet';
import './SosialeMedier.less';

const getSocialmediaShareUrl = (
    el: string,
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

    return encodeURI(shareUrl[el]) || null;
};

interface Props {
    social: string[];
    displayName: string;
    contentPath: string;
}
const SosialeMedier = (props: Props) => {
    const sosialMediaName: { [key: string]: string } = {
        linkedin: 'LinkedIn',
        facebook: 'Facebook',
        twitter: 'Twitter',
    };

    const socialMedia = props.social?.map((el) => ({
        type: el,
        text: `Del på ${sosialMediaName[el]}`,
        href: getSocialmediaShareUrl(
            el,
            props.displayName,
            xpPathToUrl(props.contentPath)
        ),
    }));

    return socialMedia && socialMedia.length > 0 ? (
        <div className="social-media">
            <ul>
                {socialMedia.map((item) => (
                    <li key={item.type}>
                        <LenkeUstylet
                            href={item.href}
                            analyticsLabel={item.text}
                        >
                            <span className={`share-social share-${item.type}`}>
                                {item.text}
                            </span>
                        </LenkeUstylet>
                    </li>
                ))}
            </ul>
        </div>
    ) : null;
};
export default SosialeMedier;
