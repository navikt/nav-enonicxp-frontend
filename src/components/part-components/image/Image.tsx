import React from 'react';
import { Component } from '../../../types/content-types/_schema';

const Img = (props: Component) => {
    const { imageUrl } = props.image?.image;

    if (imageUrl) {
        const height = 800;
        const width = 800;
        const src = imageUrl.replace('$scale', `block-${width}-${height}`);
        return <img src={src} />;
    }
    return null;
};

export default Img;
