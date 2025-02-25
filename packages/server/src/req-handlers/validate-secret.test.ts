import { NextFunction } from 'express';
import { buildValidateSecretMiddleware } from './validate-secret-middleware';

const mySecret = 'mySecret';

describe('Validate secret header middleware', () => {
    let nextAppMock: any;
    let validateSecretMiddleware: any;
    let nextFunction: NextFunction;

    const resObject = { status: jest.fn().mockReturnValue(this) };

    process.env.SERVICE_SECRET = mySecret;

    beforeEach(() => {
        nextFunction = jest.fn();
        nextAppMock = { renderError: jest.fn() };
        validateSecretMiddleware = buildValidateSecretMiddleware(nextAppMock);
    });

    test('Next function should be called on valid secrets', () => {
        validateSecretMiddleware({ headers: { secret: mySecret } }, resObject, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
        expect(nextAppMock.renderError).toBeCalledTimes(0);
    });

    test('renderError should be called on invalid secrets', () => {
        validateSecretMiddleware({ headers: { secret: 'notMySecret' } }, resObject, nextFunction);

        validateSecretMiddleware({ headers: {} }, resObject, nextFunction);

        expect(nextFunction).toBeCalledTimes(0);
        expect(nextAppMock.renderError).toBeCalledTimes(2);
    });
});
