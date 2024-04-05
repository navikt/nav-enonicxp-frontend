import React from 'react';
import { MacroPhoneLinkProps } from 'types/macro-props/phone-link';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { LenkeStandalone } from 'components/_common/lenke/LenkeStandalone';

export const MacroPhoneLink = ({ config }: MacroPhoneLinkProps) => {
    if (!config?.phone_link) {
        return null;
    }

    const { text, phoneNumber, chevron } = config.phone_link;

    const href = `tel:${phoneNumber}`;

    return chevron ? (
        <LenkeStandalone withChevron={true} href={href}>
            {text}
        </LenkeStandalone>
    ) : (
        <LenkeInline href={href}>{text}</LenkeInline>
    );
};
