export type OpeningHourRegular =
    | {
          status: 'CLOSED';
          dayName: string;
      }
    | {
          status: 'OPEN';
          dayName: string;
          from: string;
          to: string;
      };

export type OpeningHourSpecial =
    | {
          status: 'CLOSED';
          date: string;
      }
    | {
          status: 'OPEN';
          from: string;
          to: string;
          date: string;
      };

export type RegularOpeningHours = {
    hours: OpeningHourRegular[];
};

export type SpecialOpeningHours = {
    validFrom: string;
    validTo: string;
    hours?: OpeningHourSpecial[];
};

type OpeningHourCommon = {
    dayName: string;
    date: string;
};

export type OpeningHourOpen = {
    status: 'OPEN';
    from: string;
    to: string;
} & OpeningHourCommon;

export type OpeningHourClosed = {
    status: 'CLOSED';
} & OpeningHourCommon;

export type OpeningHour = OpeningHourOpen | OpeningHourClosed;
