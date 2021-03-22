import { MediaType, XpImage } from '../types/media';
import { getMediaUrl } from './urls';

export const getImageUrl = (image: XpImage, scale?: string) => {
    if (!image) {
        return null;
    }

    const url =
        image.__typename === MediaType.Image && scale
            ? image.imageUrl?.replace('$scale', scale)
            : image.mediaUrl;

    return getMediaUrl(url);
};
