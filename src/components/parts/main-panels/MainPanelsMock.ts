import { ContentType } from 'types/content-types/_schema';

export const MainPanelMock = {
    tableContents: [
        {
            __typename: ContentType.TransportPage,
            _path: '/',
            displayName: 'Panel 1',
            data: {
                ingress: 'Din ingress',
            },
        },
        {
            __typename: ContentType.ExternalLink,
            _path: '/',
            displayName: 'Panel 2',
            data: {
                description: 'Din ingress',
                url: '/',
            },
        },
        {
            __typename: ContentType.ExternalLink,
            _path: '/',
            displayName: 'Panel 3',
            data: {
                description: 'Din ingress',
                url: '/',
            },
        },
    ],
};
