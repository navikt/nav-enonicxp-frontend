import React from 'react';
import { Picture } from 'types/content-props/artikkel-props';
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

    const sizeClassMap: Record<string, string> = {
        '40': style.figureSmall,
        '70': style.figureMedium,
        '100': style.figureFull,
    };

    const imgClass = sizeClassMap[size || '100'] || style.figureFull;

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
