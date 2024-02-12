type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export const translationsBundleNb = {
    office: {
        chooseBetweenOffices: 'Du kan velge ett av de følgende kontorene.',
        closed: 'Stengt',
        openingHoursWithoutAppointment: 'Åpningstider når du ikke har avtale',
        appointmentOnly: 'Kun timeavtale',
        specialOpeningHours: 'Spesielle åpningstider',
        address: 'Adresse',
        youCanMakeAppointment:
            'Du kan avtale møte med veilederen din utenom disse åpningstidene.',
    },
    dateTime: {
        weekDayNames: [
            'Mandag',
            'Tirsdag',
            'Onsdag',
            'Torsdag',
            'Fredag',
            'Lørdag',
            'Søndag',
        ],
        time: 'tid',
        day: 'dag',
    },
};

export type Translations = typeof translationsBundleNb;
export type PartialTranslations = DeepPartial<Translations>;
