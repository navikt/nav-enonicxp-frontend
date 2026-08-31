import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import type { OfficePageProps } from 'types/content-props/dynamic-page-props';
import type { OfficeType } from 'types/content-props/office-details-props';
import { OfficePage } from './OfficePage';

const mockComponentMapper = jest.fn((_props: unknown) => null);
const mockOfficePageHeader = jest.fn((_props: unknown) => null);
const mockOfficeDetails = jest.fn((_props: unknown) => null);
const mockLoggerError = jest.fn();

jest.mock('components/ComponentMapper', () => ({
    ComponentMapper: (props: unknown) => mockComponentMapper(props),
}));

jest.mock('components/pages/office-page/office-page-header/OfficePageHeader', () => ({
    OfficePageHeader: (props: unknown) => mockOfficePageHeader(props),
}));

jest.mock('components/pages/office-page/officeDetails/OfficeDetails', () => ({
    OfficeDetails: (props: unknown) => mockOfficeDetails(props),
}));

jest.mock('./linkedIn/LinkedIn', () => ({
    LinkedIn: () => null,
}));

jest.mock('../../../../../shared/src/logger', () => ({
    logger: { error: (message: string) => mockLoggerError(message) },
}));

const ownPage = { type: 'layout', path: '/own-page' };
const editorialPage = { type: 'layout', path: '/editorial-page' };

const officePageProps = ({
    officeType,
    useUnitEditorialPage,
    withEditorialPage = true,
    hidePhoneInformation,
    locationLabel,
}: {
    officeType: OfficeType;
    useUnitEditorialPage?: boolean;
    withEditorialPage?: boolean;
    hidePhoneInformation?: boolean;
    locationLabel?: string;
}) =>
    ({
        displayName: 'Test office',
        data: {
            title: 'Test office title',
            useUnitEditorialPage,
            officeNorgData: {
                _selected: 'data',
                data: {
                    type: officeType,
                    hidePhoneInformation,
                    beliggenhet: {
                        type: 'stedsadresse',
                        gatenavn: 'Norggata',
                        locationLabel,
                    },
                },
            },
        },
        page: ownPage,
        editorial: withEditorialPage ? { page: editorialPage } : undefined,
    }) as unknown as OfficePageProps;

describe('OfficePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the shared editorial page for unit office types', () => {
        const props = officePageProps({ officeType: 'OKONOMI' });

        render(<OfficePage {...props} />);

        expect(mockComponentMapper).toHaveBeenCalledWith(
            expect.objectContaining({ componentProps: editorialPage, pageProps: props })
        );
    });

    test('passes unit phone settings to office details', () => {
        render(
            <OfficePage
                {...officePageProps({
                    officeType: 'KONTROLL',
                    hidePhoneInformation: true,
                })}
            />
        );

        expect(mockOfficeDetails).toHaveBeenCalledWith({
            officeData: expect.any(Object),
            hidePhoneInformation: true,
            isUnit: true,
            locationLabel: undefined,
        });
    });

    test('passes a custom location label only for editorial offices', () => {
        render(
            <OfficePage
                {...officePageProps({
                    officeType: 'REDAKSJONELT',
                    locationLabel: 'Besøksadresse',
                })}
            />
        );

        expect(mockOfficeDetails).toHaveBeenCalledWith({
            officeData: expect.any(Object),
            hidePhoneInformation: false,
            isUnit: false,
            locationLabel: 'Besøksadresse',
        });
    });

    test('renders the office page content when no shared editorial page applies', () => {
        const props = officePageProps({ officeType: 'HMS' });

        render(<OfficePage {...props} />);

        expect(mockComponentMapper).toHaveBeenCalledWith(
            expect.objectContaining({ componentProps: ownPage, pageProps: props })
        );
    });

    test('does not render page content for an editorial office without unit opt-in', () => {
        render(<OfficePage {...officePageProps({ officeType: 'REDAKSJONELT' })} />);

        expect(mockComponentMapper).not.toHaveBeenCalled();
    });

    test('keeps office information visible when expected editorial content is missing', () => {
        render(
            <OfficePage {...officePageProps({ officeType: 'LOKAL', withEditorialPage: false })} />
        );

        expect(mockOfficePageHeader).toHaveBeenCalled();
        expect(mockOfficeDetails).toHaveBeenCalled();
        expect(mockComponentMapper).not.toHaveBeenCalled();
        expect(mockLoggerError).toHaveBeenCalledWith(
            'No editorial page found for office branch Test office'
        );
    });
});
