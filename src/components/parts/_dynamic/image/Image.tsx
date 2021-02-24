import React from 'react';
import { BEM } from 'utils/classnames';
import './Image.less';

type Props = {
    imageUrl: string;
};

const Image = ({ imageUrl }: Props) => {
    if (!imageUrl) {
        return <h2>Tomt bilde</h2>;
    }

    const bem = BEM('image');
    const height = 800;
    const width = 800;
    const src = imageUrl.replace('$scale', `block-${width}-${height}`);

    return <img className={bem()} src={src} alt={''} />;
};

export default Image;
