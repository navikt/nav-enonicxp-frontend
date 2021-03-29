interface Address {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
}

interface OpeningHoursSpecification {
    '@type': string;
    dayOfWeek?: string;
    description?: string;
    opens?: string;
    closes?: string;
}

interface Department {
    '@type': string;
    '@id': string;
    name: string;
    location: string;
    image: string;
    telephone: string;
    url: string;
    address: Address;
    openingHoursSpecification: OpeningHoursSpecification[];
}

export interface AnnouncementLocation {
    '@type': string;
    name: string;
    image: string;
    telephone: string;
    url: string;
    address: Address;
}

export interface SpecialAnnouncement {
    '@context': string;
    '@type': string;
    name: string;
    text: string;
    datePosted: string;
    expires: string;
    category: string;
    announcementLocation: AnnouncementLocation;
}

export interface GovernmentOffice {
    '@context': string;
    '@type': string;
    '@id': string;
    name: string;
    image: string;
    telephone: string;
    faxNumber: string;
    address: Address;
    url: string;
    vatID: string;
    department: Department[];
}
