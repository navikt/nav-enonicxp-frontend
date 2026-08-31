import { OfficeType } from 'types/content-props/office-details-props';

const unitOfficeTypes: ReadonlySet<OfficeType> = new Set(['OKONOMI', 'OPPFUTLAND', 'KONTROLL']);

export const isUnitOfficeType = (officeType: OfficeType, useUnitEditorialPage?: boolean) =>
    unitOfficeTypes.has(officeType) ||
    (officeType === 'REDAKSJONELT' && useUnitEditorialPage === true);

export const shouldUseOfficeEditorialPage = (
    officeType: OfficeType,
    useUnitEditorialPage?: boolean
) =>
    officeType === 'LOKAL' ||
    officeType === 'ALS' ||
    isUnitOfficeType(officeType, useUnitEditorialPage);
