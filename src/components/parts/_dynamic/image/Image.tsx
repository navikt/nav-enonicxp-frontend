import React from 'react';
import {
    ComponentType,
    ImageComponentProps,
} from '../../../../types/component-props/_component-common';
import './Image.less';

const Image = ({ image, path }: ImageComponentProps) => {
    const { imageUrl } = image;
    if (!imageUrl) {
        return <h2>Tomt bilde</h2>;
    }

    const height = 800;
    const width = 800;
    const src = imageUrl.replace('$scale', `block-${width}-${height}`);

    return (
        <div
            className={'default'}
            data-portal-component-type={ComponentType.Image}
            data-portal-component={path}
            data-th-remove="tag"
        >
            <img className={'image'} src={src} alt={''} />
        </div>
    );
};

export default Image;
