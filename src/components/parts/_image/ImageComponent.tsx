import React from 'react';
import {
    ComponentType,
    ImageComponentProps,
} from 'types/component-props/_component-common';
import { BodyShort } from '@navikt/ds-react';
import { NextImage } from 'components/_common/image/NextImage';

import style from './Image.module.scss';

type Props = {
    imageProps: ImageComponentProps;
    editMode?: boolean;
};

const height = 800;
const width = 800;

export const ImageComponentXp = ({ imageProps, editMode }: Props) => {
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
                <NextImage className={style.image} src={src} alt={''} />
            ) : (
                <BodyShort>{'Bilde mangler'}</BodyShort>
            )}
        </div>
    );
};
