import * as React from 'react';
import { Picture } from '../../../types/content-props/main-article-props';
import { getImageUrl } from '../../../utils/images';

interface Props {
    picture?: Picture;
}

const Bilde = (props: Props) => {
    const { picture } = props;
    if (!picture?.target) {
        return null;
    }

    const { size, target } = picture;

    const imgClass =
        size === '40'
            ? 'figure-small'
            : size === '70'
            ? 'figure-medium'
            : 'figure-full';
    const src = getImageUrl(target, 'max-768');

    if (!src) {
        return null;
    }

    return (
        <div className="figure-container">
            <figure className={imgClass}>
                <img src={src} alt={picture.altText || ''} />
                {picture.caption && (
                    <figcaption className="decorated">
                        {picture.caption}
                    </figcaption>
                )}
            </figure>
        </div>
    );
};
export default Bilde;
