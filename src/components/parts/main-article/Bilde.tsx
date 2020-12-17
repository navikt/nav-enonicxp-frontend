import * as React from 'react';
import { Picture } from '../../../types/content-props/main-article-props';

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
    const height = 768;
    const width = 'max';
    const src =
        target.__typename === 'media_Vector'
            ? target.mediaUrl
            : target.imageUrl?.replace('$scale', `${width}-${height}`);

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
