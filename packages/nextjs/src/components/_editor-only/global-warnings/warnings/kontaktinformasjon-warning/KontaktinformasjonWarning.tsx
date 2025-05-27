import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { TelephoneData } from 'components/parts/contact-option/ContactOptionPart';

type Props = {
    content: ContentProps;
} & TelephoneData;

export const KontaktinformasjonWarning = ({ content }: Props) => {
    const contactType = content.data?.contactType;

    const specialOpeningHours = contactType?.telephone?.specialOpeningHours;
    const regularOpeningHours = contactType?.telephone?.regularOpeningHours;

    const validDateFrom = specialOpeningHours?.validFrom
        ? new Date(specialOpeningHours.validFrom)
        : null;
    const validDateTo = specialOpeningHours?.validTo ? new Date(specialOpeningHours.validTo) : null;
    const hours = specialOpeningHours?.hours || [];

    const warnings: React.ReactNode[] = [];

    const isValidDate = (date: Date | null): date is Date =>
        date instanceof Date && !isNaN(date.getTime());

    if (validDateFrom && validDateTo) {
        const dateFromStr = validDateFrom.toISOString();
        const dateToStr = validDateTo.toISOString();

        if (validDateFrom > validDateTo) {
            warnings.push(
                <li key="range-error">
                    For spesielle åpningstider må synlig fra-dato ({dateFromStr}) være{' '}
                    <strong>før</strong> synlig til-dato ({dateToStr})
                </li>
            );
        }

        if (specialOpeningHours !== null && !regularOpeningHours) {
            hours.forEach((day: any) => {
                const dagDato = new Date(day.date);
                const dagDatoStr = dagDato.toISOString();

                if (!isValidDate(dagDato)) {
                    warnings.push(
                        <li key={`invalid-date-${day.date}`}>
                            For spesielle åpningstider må dato være gyldig ({day.date})
                        </li>
                    );
                    return;
                }

                if (dagDato < validDateFrom) {
                    warnings.push(
                        <li key={`before-from-${dagDatoStr}`}>
                            For spesielle åpningstider må dag ({dagDatoStr}) være{' '}
                            <strong>etter</strong> synlig fra-dato ({dateFromStr})
                        </li>
                    );
                }

                if (dagDato > validDateTo) {
                    warnings.push(
                        <li key={`after-to-${dagDatoStr}`}>
                            For spesielle åpningstider må dag ({dagDatoStr}) være{' '}
                            <strong>før</strong> synlig til-dato ({dateFromStr})
                        </li>
                    );
                }
            });
        }
    }

    return warnings.length > 0 ? <>{warnings}</> : null;
};
