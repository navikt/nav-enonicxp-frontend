type OpeningInfoCommon = {
    dayName: string;
    date: string;
    status: OpeningInfoStatus;
};

export type OpeningInfoOpenProps = {
    status: 'OPEN' | 'OPEN_LATER';
    from: string;
    to: string;
} & OpeningInfoCommon;

export type OpeningInfoClosedProps = {
    status: 'CLOSED';
} & OpeningInfoCommon;

export type OpeningInfoProps = OpeningInfoOpenProps | OpeningInfoClosedProps;

export type OpeningInfoStatus = 'OPEN' | 'OPEN_LATER' | 'CLOSED';
