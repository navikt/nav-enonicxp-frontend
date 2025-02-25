import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Cookie from 'js-cookie';
import { UserTestsPublicView } from 'components/_common/user-tests/public-view/UserTestsPublicView';
import { UserTestsComponentProps } from 'components/_common/user-tests/UserTests';
import { mockStore } from 'store/store';
import { UserTestVariantProps } from 'types/content-props/user-tests-config';
import { PageContextProvider } from 'store/pageContext';

const cookieId = 'cookie-1234';

const baseProps: UserTestsComponentProps & { _path: string } = {
    selectedTestIds: [],
    tests: {
        data: {
            cookieId,
            title: 'Test common title',
            ingress: 'Test common ingress',
            variants: [],
        },
    },
    _path: 'test',
};

const buildProps = (variants: UserTestVariantProps[], selectedTestIds: string[] = []) => {
    const props = { ...baseProps };
    props.tests.data.variants = variants;
    props.selectedTestIds = selectedTestIds;

    return props;
};

const UserTestsWithProvider = (props: UserTestsComponentProps) => (
    <PageContextProvider content={props}>
        <Provider store={mockStore}>
            <UserTestsPublicView {...props} />
        </Provider>
    </PageContextProvider>
);

const mockRandom = (num: number) => jest.spyOn(Math, 'random').mockReturnValue(num);

beforeEach(() => {
    jest.spyOn(Math, 'random').mockClear();
    Cookie.remove(`usertest-${cookieId}`);
    cleanup();
});

describe('Single variant', () => {
    const variant100 = [
        {
            id: 'variant-1',
            url: 'https://www.nav.no',
            percentage: 100,
            linkText: 'Variant 1',
        },
    ];

    const variant50 = [
        {
            id: 'variant-1',
            url: 'https://www.nav.no',
            percentage: 50,
            linkText: 'Variant 1',
        },
    ];

    test.each([0, 0.5, 1])('Should render a 100% variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variant100)} />);

        expect(screen.queryByText('Variant 1')).toBeTruthy();
    });

    test.each([0, 0.25, 0.5])('Should render a 50% variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variant50)} />);

        expect(screen.queryByText('Variant 1')).toBeTruthy();
    });

    test.each([0.51, 1])('Should not render a 50% variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variant50)} />);

        expect(screen.queryByText('Variant 1')).toBeFalsy();
    });
});

describe('Two variants', () => {
    const variants = [
        {
            id: 'variant-1',
            percentage: 50,
            url: 'https://www.nav.no',
            linkText: 'Variant 1',
        },
        {
            id: 'variant-2',
            percentage: 50,
            url: 'https://www.nav.no',
            linkText: 'Variant 2',
        },
    ];

    test.each([0, 0.1, 0.5])('Should pick the first variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variants)} />);

        expect(screen.queryByText('Variant 1')).toBeTruthy();
        expect(screen.queryByText('Variant 2')).toBeFalsy();
    });

    test.each([0.51, 0.99, 1])('Should pick the second variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variants)} />);

        expect(screen.queryByText('Variant 1')).toBeFalsy();
        expect(screen.queryByText('Variant 2')).toBeTruthy();
    });
});

describe('Multiple variants with >100% sum', () => {
    const variants = [
        {
            id: 'variant-1',
            percentage: 60,
            url: 'https://www.nav.no',
            linkText: 'Variant 1',
        },
        {
            id: 'variant-2',
            percentage: 50,
            url: 'https://www.nav.no',
            linkText: 'Variant 2',
        },
        {
            id: 'variant-3',
            percentage: 40,
            url: 'https://www.nav.no',
            linkText: 'Variant 3',
        },
    ];

    test.each([0, 0.4])('Should pick the first variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variants)} />);

        expect(screen.queryByText('Variant 1')).toBeTruthy();
        expect(screen.queryByText('Variant 2')).toBeFalsy();
        expect(screen.queryByText('Variant 3')).toBeFalsy();
    });

    test.each([0.401, 0.733])('Should pick the second variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variants)} />);

        expect(screen.queryByText('Variant 1')).toBeFalsy();
        expect(screen.queryByText('Variant 2')).toBeTruthy();
        expect(screen.queryByText('Variant 3')).toBeFalsy();
    });

    test.each([0.734, 1])('Should pick the third variant', (value) => {
        mockRandom(value);
        render(<UserTestsWithProvider {...buildProps(variants)} />);

        expect(screen.queryByText('Variant 1')).toBeFalsy();
        expect(screen.queryByText('Variant 2')).toBeFalsy();
        expect(screen.queryByText('Variant 3')).toBeTruthy();
    });
});

describe('Multiple variants with limited selection', () => {
    const variants = [
        {
            id: 'variant-1',
            percentage: 25,
            url: 'https://www.nav.no',
            linkText: 'Variant 1',
        },
        {
            id: 'variant-2',
            percentage: 25,
            url: 'https://www.nav.no',
            linkText: 'Variant 2',
        },
        {
            id: 'variant-3',
            percentage: 25,
            url: 'https://www.nav.no',
            linkText: 'Variant 3',
        },
        {
            id: 'variant-4',
            percentage: 25,
            url: 'https://www.nav.no',
            linkText: 'Variant 4',
        },
    ];

    test.each([0.01, 0.99])('Should pick the first variant from single selection', () => {
        render(<UserTestsWithProvider {...buildProps(variants, ['variant-1'])} />);

        expect(screen.queryByText('Variant 1')).toBeTruthy();
        expect(screen.queryByText('Variant 2')).toBeFalsy();
        expect(screen.queryByText('Variant 3')).toBeFalsy();
        expect(screen.queryByText('Variant 4')).toBeFalsy();
    });

    test.each([0.01, 0.99])('Should pick the second variant from single selection', () => {
        render(<UserTestsWithProvider {...buildProps(variants, ['variant-2'])} />);

        expect(screen.queryByText('Variant 1')).toBeFalsy();
        expect(screen.queryByText('Variant 2')).toBeTruthy();
        expect(screen.queryByText('Variant 3')).toBeFalsy();
        expect(screen.queryByText('Variant 4')).toBeFalsy();
    });

    test.each([0.01, 0.5])('Should pick the first variant from double selection', () => {
        mockRandom(0.49);
        render(<UserTestsWithProvider {...buildProps(variants, ['variant-1', 'variant-2'])} />);

        expect(screen.queryByText('Variant 1')).toBeTruthy();
        expect(screen.queryByText('Variant 2')).toBeFalsy();
        expect(screen.queryByText('Variant 3')).toBeFalsy();
        expect(screen.queryByText('Variant 4')).toBeFalsy();
    });

    test.each([0.501, 0.999])('Should pick the fourth variant from double selection', () => {
        mockRandom(0.51);
        render(<UserTestsWithProvider {...buildProps(variants, ['variant-1', 'variant-4'])} />);

        expect(screen.queryByText('Variant 1')).toBeFalsy();
        expect(screen.queryByText('Variant 2')).toBeFalsy();
        expect(screen.queryByText('Variant 3')).toBeFalsy();
        expect(screen.queryByText('Variant 4')).toBeTruthy();
    });
});

describe('Persist variant selection', () => {
    const variants = [
        {
            id: 'variant-1',
            percentage: 50,
            url: 'https://www.nav.no',
            linkText: 'Variant 1',
        },
        {
            id: 'variant-2',
            percentage: 50,
            url: 'https://www.nav.no',
            linkText: 'Variant 2',
        },
    ];

    test('Should remember the initial selection', () => {
        mockRandom(0.25);
        render(<UserTestsWithProvider {...buildProps(variants)} />);

        mockRandom(0.75);
        cleanup();
        render(<UserTestsWithProvider {...buildProps(variants)} />);

        expect(screen.queryByText('Variant 1')).toBeTruthy();
        expect(screen.queryByText('Variant 2')).toBeFalsy();
    });
});
