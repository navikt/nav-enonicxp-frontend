import { ContentType } from 'types/content-props/_content-common';

export const useLayoutVersion = (contentType: ContentType) => {
    return contentType === ContentType.ProductPage ? '1' : '2';
};
