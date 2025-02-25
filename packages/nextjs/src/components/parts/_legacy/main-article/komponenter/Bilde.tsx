import React from 'react';
import { Picture } from 'types/content-props/main-article-props';
import { XpImage } from 'components/_common/image/XpImage';

import style from './Bilde.module.scss';

type Props = {
    picture?: Picture;
};

export const Bilde = (props: Props) => {
    const { picture } = props;
    if (!picture?.target) {
        return null;
    }

    const { size, target } = picture;

    const imgClass =
        size === '40' ? style.figureSmall : size === '70' ? style.figureMedium : style.figureFull;

    return (
        <div className={style.figureContainer}>
            <figure className={imgClass}>
                <XpImage imageProps={target} alt={picture.altText || ''} maxWidth={768} />
                {picture.caption && (
                    <figcaption className="decorated">{picture.caption}</figcaption>
                )}
            </figure>
        </div>
    );
};
