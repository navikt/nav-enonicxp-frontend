type OpeningHoursCommon = {
    dayName: string;
    date: string;
    status: OpeningHoursStatus;
};

export type OpeningHoursOpen = {
    status: 'OPEN' | 'OPEN_LATER';
    from: string;
    to: string;
} & OpeningHoursCommon;

export type OpeningHoursClosed = {
    status: 'CLOSED';
} & OpeningHoursCommon;

export type OpeningHours = OpeningHoursOpen | OpeningHoursClosed;

export type OpeningHoursStatus = 'OPEN' | 'OPEN_LATER' | 'CLOSED';
