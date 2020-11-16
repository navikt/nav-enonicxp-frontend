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

    const imgClass = picture.size === '40' ? 'figure-small' : (props.size  === '70' ? 'figure-medium' : 'figure-full');
    const height = 768;
    const width = 'max';
    const src = picture.target.imageUrl.replace('$scale', `${width}-${height}`);
    const imageObj =  {
        url: src,
        imgClass,
        caption: picture.caption,
        altText: picture.altText
    };

    return (
        <div className="figure-container">
          <figure className={imageObj.imgClass}>
            <img
                src={imageObj.url}
                alt={imageObj.altText || ''}
            />
              {imageObj.caption &&
              <figcaption className="decorated">
                  {imageObj.caption}
              </figcaption>
              }
          </figure>
        </div>
    );
}
export default Bilde;
