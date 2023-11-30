import Cookie from 'js-cookie';

const DID_PARTICIPATE_VALUE = 'done';
const EXPIRE_TIME = 30;

const setCookie = (key: string, value: string) =>
    Cookie.set(key, value, { expires: EXPIRE_TIME });

export const userTestSetSelection = (cookieId: string, variantId: string) =>
    setCookie(cookieId, variantId);

export const userTestGetSelectedVariantId = (cookieId: string) =>
    Cookie.get(cookieId);

export const userTestSetParticipation = (cookieId: string) =>
    setCookie(cookieId, DID_PARTICIPATE_VALUE);

export const userTestDidUserParticipate = (cookieId: string) =>
    Cookie.get(cookieId) === DID_PARTICIPATE_VALUE;
