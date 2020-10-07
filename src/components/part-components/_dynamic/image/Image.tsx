import React from 'react';
import { BEM } from '../../../../utils/bem';
import { DynamicImage } from '../../../../types/content-types/_dynamic/image';
import './Image.less';

const Image = (props: DynamicImage) => {
    const { imageUrl } = props.image.image;
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
