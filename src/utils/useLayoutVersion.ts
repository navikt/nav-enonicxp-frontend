import { ContentType } from 'types/content-props/_content-common';

export const useLayoutVersion = (contentType: ContentType) => {
    return contentType.includes('V2') ? '2' : '1';
};
