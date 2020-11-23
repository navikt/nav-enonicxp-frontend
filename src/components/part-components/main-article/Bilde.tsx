import * as React from 'react';
import { Picture } from '../../../types/content-types/main-article-content-props';

interface Props {
    picture?: Picture
}

const Bilde = (props: Props) => {
    const {picture} = props;
    if (!picture) {
        return <></>;
    }

    const imgClass = picture.size === '40' ? 'figure-small' : (picture.size  === '70' ? 'figure-medium' : 'figure-full');
    const height = 768;
    const width = 'max';
    const src = picture.target.imageUrl.replace('$scale', `${width}-${height}`);

    return (
        <div className="figure-container">
          <figure className={imgClass}>
            <img
                src={src}
                alt={picture.altText || ''}
            />
               {picture.caption &&
              <figcaption className="decorated">
                      {picture.caption}
              </figcaption>
              }
          </figure>
        </div>
    );
}
export default Bilde;
