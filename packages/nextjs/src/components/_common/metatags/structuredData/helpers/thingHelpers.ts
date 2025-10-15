import { Thing } from 'components/_common/metatags/structuredData/types';

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
