import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { SectionPageData } from 'types/content-props/section-page-props';

const commonProps = {
    _id: 'cd3c1fc5-53e9-4cdd-8287-ef69405832bd',
    _path: '#',
    createdTime: '2019-10-31T12:51:49Z',
    modifiedTime: '2019-12-12T13:40:51.919815Z',
    language: 'no',
    publish: {
        from: '',
    },
    data: {},
} as const satisfies Partial<ContentProps>;

export const lenkelisteDataMock: SectionPageData = {
    ntkContents: {
        ...commonProps,
        type: ContentType.ContentList,
        displayName: 'Nyttig å vite',
        data: {
            sectionContents: [
                {
                    ...commonProps,
                    type: ContentType.Artikkel,
                    displayName: 'Artikkel 1',
                },
                {
                    ...commonProps,
                    type: ContentType.PageList,
                    displayName: 'Artikkel 2',
                },
            ],
        },
    },
    newsContents: {
        ...commonProps,
        type: ContentType.ContentList,
        displayName: 'Nyheter',
        data: {
            sectionContents: [
                {
                    ...commonProps,
                    type: ContentType.Artikkel,
                    displayName: 'Nyhet 1',
                },
                {
                    ...commonProps,
                    type: ContentType.Artikkel,
                    displayName: 'Nyhet 2',
                },
            ],
        },
    },
    scContents: {
        ...commonProps,
        type: ContentType.ContentList,
        displayName: 'Snarveier',
        data: {
            sectionContents: [
                {
                    ...commonProps,
                    type: ContentType.Artikkel,
                    displayName: 'Snarvei 1',
                },
                {
                    ...commonProps,
                    type: ContentType.InternalLink,
                    displayName: 'Snarvei 2',
                    data: { target: { _path: '' } },
                },
            ],
        },
    },
    moreNewsUrl: '/sok?f=1&daterange=-1&ord=&c=1&s=0',
};
