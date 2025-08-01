import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';

type Props = {
    content: ContentProps;
    className?: string;
};

export const FormNumbersWarning = ({ content, className }: Props) => {
    const formNumberRegex = /^NAV \d{2}-\d{2}\.\d{2}([A-Za-z])?$/;

    const hasInvalidFormNumbers = (): boolean => {
        if (content.type === 'no.nav.navno:form-details') {
            return !!content.data?.formNumbers?.some(
                (formNumber: string) => !formNumberRegex.test(formNumber)
            );
        } else return false;
    };

    return hasInvalidFormNumbers() ? (
        <li key="form-numbers-warning" className={className}>
            Skjemanummer må være på formatet {'NAV XX-XX.XX'} eller {'NAV XX-XX.XXy'}
        </li>
    ) : null;
};
