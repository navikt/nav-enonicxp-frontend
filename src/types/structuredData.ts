interface AddressSchema {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
}

interface OpeningHoursSpecificationSchema {
    '@type': string;
    dayOfWeek?: string;
    description?: string;
    opens?: string;
    closes?: string;
}

interface AnnouncementLocationSchema {
    '@type': string;
    name: string;
    image: string;
    telephone: string;
    url: string;
    address: AddressSchema;
}

interface DepartmentSchema {
    '@type': string;
    '@id': string;
    name: string;
    location: string;
    image: string;
    telephone: string;
    url: string;
    address: AddressSchema;
    openingHoursSpecification: OpeningHoursSpecificationSchema[];
}

export interface SpecialAnnouncementSchema {
    '@context': string;
    '@type': string;
    name: string;
    text: string;
    datePosted: string;
    expires: string;
    category: string;
    announcementLocation: AnnouncementLocationSchema;
}

export interface GovernmentOfficeSchema {
    '@context': string;
    '@type': string;
    '@id': string;
    name: string;
    image: string;
    telephone: string;
    faxNumber: string;
    address: AddressSchema;
    url: string;
    vatID: string;
    department: DepartmentSchema[];
}
