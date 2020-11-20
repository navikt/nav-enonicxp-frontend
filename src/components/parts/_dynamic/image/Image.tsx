import React from 'react';
import { DynamicImage } from 'types/content-types/_dynamic/image';
import { BEM } from 'utils/bem';
import './Image.less';

const Image = (props: DynamicImage) => {
    const image = props.image?.image;

    if (!image) {
        return <h2>Tomt bilde</h2>;
    }

    const { imageUrl } = image;
    const bem = BEM('image');
    if (imageUrl) {
        const height = 800;
        const width = 800;
        const src = imageUrl.replace('$scale', `block-${width}-${height}`);
        return <img className={bem()} src={src} />;
    }
    return null;
};

export default Image;
