import Cookie from 'js-cookie';

const EXPIRE_TIME = 30;

const getCookieKey = (cookieId: string) => `usertest-${cookieId}`;

export const userTestSetSelection = (cookieId: string, variantId: string) =>
    Cookie.set(getCookieKey(cookieId), variantId, { expires: EXPIRE_TIME });

export const userTestGetSelectedVariantId = (cookieId: string) =>
    Cookie.get(getCookieKey(cookieId));
