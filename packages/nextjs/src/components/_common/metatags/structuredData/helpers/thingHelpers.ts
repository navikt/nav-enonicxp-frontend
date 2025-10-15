import { Thing } from 'components/_common/metatags/structuredData/types';
import { PageType } from 'components/_common/metatags/structuredData/types';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

export type ThingLibrary<T> = Map<string, T>;

export type CreateThingLibrariesReturn = {
    thingsById: ThingLibrary<Thing>;
    thingsByType: ThingLibrary<Thing[]>;
};

export const findThingByType = (
    type: string,
    thingsByType: ThingLibrary<Thing[]>
): Thing | undefined => {
    return thingsByType.get(type)?.[0];
};

export const createThingLibraries = (things: Thing[]): CreateThingLibrariesReturn => {
    const thingsById = new Map<string, Thing>();
    const thingsByType = new Map<string, Thing[]>();

    things.forEach((thing) => {
        thingsById.set(thing['@id'], thing);

        const type = thing['@type'];

        // Multiple Things can share the same type, so need
        // to store them in an array
        const thingsByTypeArray = thingsByType.get(type) ?? [];
        thingsByType.set(type, [...thingsByTypeArray, thing]);
    });

    return { thingsById, thingsByType };
};

export const pageTypeLibrary: Partial<Record<ContentType, PageType>> = {
    [ContentType.FrontPage]: 'WebPage',
    [ContentType.FrontPageNested]: 'WebPage',
    [ContentType.ProductPage]: 'WebPage',
    [ContentType.SectionPage]: 'WebPage',
    [ContentType.AreaPage]: 'WebPage',
    [ContentType.SituationPage]: 'WebPage',
    [ContentType.GuidePage]: 'WebPage',
    [ContentType.Oversikt]: 'WebPage',
    [ContentType.OfficePage]: 'WebPage',
};

export const getContentTypeToStructure = (content: ContentProps): PageType | undefined => {
    return pageTypeLibrary[content.type];
};
