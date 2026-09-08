import { OfficeType } from 'types/content-props/office-details-props';

const unitOfficeTypes: ReadonlySet<OfficeType> = new Set(['OKONOMI', 'OPPFUTLAND', 'KONTROLL']);

export const isUnitOfficeType = (officeType: OfficeType) =>
    unitOfficeTypes.has(officeType) || officeType === 'REDAKSJONELT';

export const getPhoneHeaderTranslationKey = (officeType: OfficeType) => {
    if (officeType === 'HMS') {
        return 'phoneToHMS';
    }

    return isUnitOfficeType(officeType) ? 'phone' : 'phoneToNav';
};

export const shouldUseOfficeEditorialPage = (
    officeType: OfficeType,
    useUnitEditorialPage?: boolean
) =>
    officeType === 'LOKAL' ||
    officeType === 'ALS' ||
    unitOfficeTypes.has(officeType) ||
    (officeType === 'REDAKSJONELT' && useUnitEditorialPage === true);
