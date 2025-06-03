import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

type Props = {
    content: ContentProps;
};

export const KontaktinformasjonWarning = ({ content }: Props) => {
    if (content.type !== ContentType.ContactInformationPage) {
        return null;
    }

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
        const dateFromStr = validDateFrom.toISOString().slice(0, 10);
        const dateToStr = validDateTo.toISOString().slice(0, 10);

        if (validDateFrom > validDateTo) {
            warnings.push(
                <li key="range-error">
                    Synlig fra-dato ({dateFromStr}) må være <strong>før</strong> synlig til-dato (
                    {dateToStr})
                </li>
            );
        }

        if (!regularOpeningHours) {
            hours.forEach((day: { date: string }) => {
                const dagDato = new Date(day.date);
                const dagDatoStr = dagDato.toISOString().slice(0, 10);

                if (!isValidDate(dagDato)) {
                    warnings.push(
                        <li key={`invalid-date-${day.date}`}>Dato må være gyldig ({day.date})</li>
                    );
                }

                if (dagDato < validDateFrom) {
                    warnings.push(
                        <li key={`before-from-${dagDatoStr}`}>
                            Dag ({dagDatoStr}) må være <strong>etter</strong> synlig fra-dato (
                            {dateFromStr})
                        </li>
                    );
                }

                if (dagDato > validDateTo) {
                    warnings.push(
                        <li key={`after-to-${dagDatoStr}`}>
                            Dag ({dagDatoStr}) må være <strong>før</strong> synlig til-dato (
                            {dateToStr})
                        </li>
                    );
                }
            });
        }
    }

    return warnings.length > 0 ? <>{warnings}</> : null;
};
