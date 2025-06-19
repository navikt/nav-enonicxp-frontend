import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { ContactOptionAlert } from 'components/_common/contact-option/ContactOptionAlert/ContactOptionAlert';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import Config from 'config';
import { WriteData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/icon/Icon';

import sharedStyle from 'components/_common/contact-option/ContactOption.module.scss';

type Props = WriteData;

export const WriteOption = ({ ingress, url, alertText, title }: Props) => {
    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();

    const translations = translator('contactPoint', language)('write');

    return (
        <div className={sharedStyle.contactOption}>
            <Icon type="message" />
            <div className={sharedStyle.content}>
                <LenkeBase
                    href={url || Config.urls.skrivTilOss}
                    analyticsLinkGroup={layoutConfig.title}
                    analyticsComponent={'Kontakt-oss kanal'}
                    className={sharedStyle.link}
                >
                    <Heading level="3" size="small">
                        {title || translations.title}
                    </Heading>
                </LenkeBase>
                {alertText && <ContactOptionAlert alertText={alertText} />}
                <BodyLong as="div" className={sharedStyle.text}>
                    <ParsedHtml htmlProps={ingress || translations.ingress} />
                </BodyLong>
            </div>
        </div>
    );
};
