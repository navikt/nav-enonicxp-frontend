import * as React from 'react';
import { xpPathToUrl } from '../../../utils/paths';
import './SosialeMedier.less';

const getSocialRef = (el: string, displayName: string, requestUrl: string) => {
    if (!requestUrl) {
        return null;
    }
    switch (el) {
        case 'facebook':
            return (
                'https://www.facebook.com/sharer/sharer.php?u=' +
                requestUrl +
                '&amp;title=' +
                displayName?.replace(/ /g, '%20')
            );
        case 'twitter':
            return (
                'https://twitter.com/intent/tweet?text=' +
                displayName?.replace(/ /g, '%20') +
                ': ' +
                requestUrl
            );
        case 'linkedin':
            return (
                'https://www.linkedin.com/shareArticle?mini=true&amp;url=' +
                requestUrl +
                '&amp;title=' +
                displayName?.replace(/ /g, '%20') +
                '&amp;source=nav.no'
            );
        default:
            return null;
    }
}

interface Props {
    social: string[],
    displayName: string,
    contentPath: string
}
const SosialeMedier = (props: Props) => {
    const socialMedia = props.social?.map((el) => {
        let tmpText = 'Del på ';
        if (el === 'linkedin') {
            tmpText += 'LinkedIn';
        } else if (el === 'facebook') {
            tmpText += 'Facebook';
        } else {
            tmpText += 'Twitter';
        }
        return {
            type: el,
            text: tmpText,
            href: getSocialRef(el, props.displayName, xpPathToUrl(props.contentPath))
        };
    });

    if (socialMedia === []) {
        return <></>
    }

    return (
        <div className="social-media">
            <ul className="share-social-media-pills">
                {socialMedia.map(item => (
                    <li key={item.type}>
                        <a
                            data-ga="share-social-media"
                            className="js-share share-container"
                            data-th-attr="data-medium=${social.type}"
                            href={item.href}
                        >
                              <span className={`share-social share-${item.type}`}>
                                 {item.text}
                              </span>
                        </a>
                    </li>
                ))
                }
            </ul>
        </div>
    );
}
export default SosialeMedier;
