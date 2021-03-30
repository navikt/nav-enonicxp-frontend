import React from 'react';
import {
    ComponentType,
    ImageComponentProps,
} from '../../../../types/component-props/_component-common';
import { Normaltekst } from 'nav-frontend-typografi';
import './Image.less';

type Props = {
    imageProps: ImageComponentProps;
    editMode?: boolean;
};

const height = 800;
const width = 800;

const Image = ({ imageProps, editMode }: Props) => {
    const { image, path } = imageProps;

    const src = image?.imageUrl?.replace('$scale', `block-${width}-${height}`);

    const editorProps = editMode
        ? {
              'data-portal-component-type': ComponentType.Image,
              'data-portal-component': path,
          }
        : undefined;

    return (
        <div {...editorProps}>
            {src ? (
                <img className={'image'} src={src} alt={''} />
            ) : (
                <Normaltekst>{'Bilde mangler'}</Normaltekst>
            )}
        </div>
    );
};

export default Image;
