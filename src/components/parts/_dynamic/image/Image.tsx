import React from 'react';
import {
    ComponentType,
    ImageComponentProps,
} from '../../../../types/component-props/_component-common';
import './Image.less';

type Props = {
    imageProps: ImageComponentProps;
    editMode?: boolean;
};

const Image = ({ imageProps, editMode }: Props) => {
    const { image, path } = imageProps;
    if (!image?.imageUrl) {
        return <h2>Tomt bilde</h2>;
    }

    const height = 800;
    const width = 800;
    const src = image.imageUrl.replace('$scale', `block-${width}-${height}`);

    const editorProps = editMode
        ? {
              'data-portal-component-type': ComponentType.Image,
              'data-portal-component': path,
              'data-th-remove': 'tag',
          }
        : undefined;

    return (
        <div className={'default'} {...editorProps}>
            <img className={'image'} src={src} alt={''} />
        </div>
    );
};

export default Image;
