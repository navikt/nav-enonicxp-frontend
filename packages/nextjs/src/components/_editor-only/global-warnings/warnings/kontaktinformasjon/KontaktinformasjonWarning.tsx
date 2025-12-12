import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

type Props = {
    content: ContentProps;
    className?: string;
};

type OpeningHours = {
    validFrom?: string;
    validTo?: string;
    hours?: { date: string }[];
};

const isValidDate = (date: Date | null): date is Date =>
    date instanceof Date && !isNaN(date.getTime());

const dateToStr = (date: Date) => date.toISOString().slice(0, 10);

const validateOpeningHours = (
    specialHours: OpeningHours | undefined,
    regularHours: unknown,
    warnings: React.ReactNode[],
    type: 'telephone' | 'chat',
    className?: string
) => {
    if (!specialHours?.validFrom || !specialHours?.validTo) return;

    const validFrom = new Date(specialHours.validFrom);
    const validTo = new Date(specialHours.validTo);
    const hours = specialHours.hours || [];

    const fromStr = dateToStr(validFrom);
    const toStr = dateToStr(validTo);

    if (validFrom > validTo) {
        warnings.push(
            <li key={`${type}-range-error`} className={className}>
                Synlig fra-dato ({fromStr}) må være <strong>før</strong> synlig til-dato ({toStr})
            </li>
        );
    }

    if (!regularHours) {
        hours.forEach(({ date }) => {
            const dayDate = new Date(date);
            const dayStr = dateToStr(dayDate);

            if (!isValidDate(dayDate)) {
                warnings.push(
                    <li key={`${type}-invalid-date-${date}`}>Dato må være gyldig ({date})</li>
                );
            }

            if (dayDate < validFrom) {
                warnings.push(
                    <li key={`${type}-before-from-${dayStr}`}>
                        Dag ({dayStr}) må være <strong>etter</strong> synlig fra-dato ({fromStr})
                    </li>
                );
            }

            if (dayDate > validTo) {
                warnings.push(
                    <li key={`${type}-after-to-${dayStr}`}>
                        Dag ({dayStr}) må være <strong>før</strong> synlig til-dato ({toStr})
                    </li>
                );
            }
        });
    }
};

export const KontaktinformasjonWarning = ({ content, className }: Props) => {
    if (content.type !== ContentType.ContactInformationPage) return null;

    const contactType = content.data?.contactType;
    const warnings: React.ReactNode[] = [];

    if (contactType?.telephone) {
        validateOpeningHours(
            contactType.telephone.specialOpeningHours,
            contactType.telephone.regularOpeningHours,
            warnings,
            'telephone',
            className
        );
    } else if (contactType?.chat) {
        validateOpeningHours(
            contactType.chat.specialOpeningHours,
            contactType.chat.regularOpeningHours,
            warnings,
            'chat',
            className
        );
    }

    return warnings.length > 0 ? <>{warnings}</> : null;
};
