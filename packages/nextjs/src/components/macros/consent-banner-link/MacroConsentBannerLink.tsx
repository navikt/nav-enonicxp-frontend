import React from 'react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { Knapp } from 'components/_common/knapp/Knapp';
import { MacroConsentBannerLinkProps } from 'types/macro-props/consent-banner-link';

type ExtraProps = {
    variant?: 'secondary';
};

export const MacroConsentBannerLink = ({ config }: MacroConsentBannerLinkProps) => {
    if (!config?.consent_banner_link) {
        return null;
    }

    const { text, presentation = 'link' } = config.consent_banner_link;

    const Element = presentation === 'link' ? LenkeInline : Knapp;
    const extraProps: ExtraProps = presentation === 'link' ? {} : { variant: 'secondary' };

    return (
        <Element
            href={'/'}
            onClick={(e) => {
                e.preventDefault();
                window.webStorageController?.showConsentBanner();
            }}
            {...extraProps}
        >
            {text}
        </Element>
    );
};
