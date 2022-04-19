import * as React from 'react';
import { Picture } from '../../../../types/content-props/main-article-props';
import { XpImage } from '../../../_common/image/XpImage';

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

    return (
        <div className="figure-container">
            <figure className={imgClass}>
                <XpImage
                    imageProps={target}
                    alt={picture.altText || ''}
                    maxWidth={768}
                />
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
