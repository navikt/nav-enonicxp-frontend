import { ContentType } from 'types/content-props/_content-common';
import { SectionPageData } from '../../../../types/content-props/section-page-props';

export const mainPanelDataMock: SectionPageData = {
    tableContents: [
        {
            __typename: ContentType.TransportPage,
            _path: '/',
            _id: '',
            createdTime: '',
            modifiedTime: '',
            language: 'no',
            displayName: 'Panel 1',
            data: {
                ingress: 'Din ingress',
            },
        },
        {
            __typename: ContentType.ExternalLink,
            _path: '/',
            _id: '',
            createdTime: '',
            modifiedTime: '',
            language: 'no',
            displayName: 'Panel 2',
            data: {
                description: 'Din ingress',
                url: '/',
            },
        },
        {
            __typename: ContentType.ExternalLink,
            _path: '/',
            _id: '',
            createdTime: '',
            modifiedTime: '',
            language: 'no',
            displayName: 'Panel 3',
            data: {
                description: 'Din ingress',
                url: '/',
            },
        },
    ],
};
