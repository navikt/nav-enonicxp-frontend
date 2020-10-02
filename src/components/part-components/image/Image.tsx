import React from 'react';
import { Component } from '../../../types/content-types/_schema';
import { BEM } from '../../../utils/bem';
import './Image.less';

const Img = (props: Component) => {
    const { imageUrl } = props.image?.image;
    const bem = BEM('image');
    if (imageUrl) {
        const height = 800;
        const width = 800;
        const src = imageUrl.replace('$scale', `block-${width}-${height}`);
        return <img className={bem()} src={src} />;
    }
    return null;
};

export default Img;
