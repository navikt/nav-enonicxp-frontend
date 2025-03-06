import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { SectionPageData } from 'types/content-props/section-page-props';

const commonProps = {
    _path: '/',
    _id: '',
    createdTime: '',
    modifiedTime: '',
    language: 'no',
    contentLayer: 'no',
} as const satisfies Partial<ContentProps>;

export const mainPanelDataMock: SectionPageData = {
    tableContents: [
        {
            ...commonProps,
            type: ContentType.TransportPage,
            displayName: 'Panel 1',
            data: {
                ingress: 'Din ingress',
            },
        },
        {
            ...commonProps,
            type: ContentType.ExternalLink,
            displayName: 'Panel 2',
            data: {
                description: 'Din ingress',
                url: '/',
            },
        },
        {
            ...commonProps,
            type: ContentType.ExternalLink,
            displayName: 'Panel 3',
            data: {
                description: 'Din ingress',
                url: '/',
            },
        },
    ],
};
