import React from 'react';
import { Heading } from '@navikt/ds-react';
import { ContactOptionAlert } from 'components/_common/contact-option/_shared-utils/ContactOptionAlert/ContactOptionAlert';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import Config from 'config';
import { WriteData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/_shared-utils/icon/Icon';
import { ContactOptionLayout } from 'components/_common/contact-option/_shared-utils/ContactOptionLayout/ContactOptionLayout';
import { ContactOptionIngress } from 'components/_common/contact-option/_shared-utils/ContactOptionIngress/ContactOptionIngress';
import { ContactOptionLenkebase } from 'components/_common/contact-option/_shared-utils/ContactOptionLenkebase/ContactOptionLenkebase';

type Props = WriteData;

export const WriteOption = ({ ingress, url, alertText, title }: Props) => {
    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();

    const translations = translator('contactPoint', language)('write');

    return (
        <ContactOptionLayout icon={<Icon type="message" />}>
            <ContactOptionLenkebase
                href={url || Config.urls.skrivTilOss}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
            >
                <Heading level="3" size="small">
                    {title || translations.title}
                </Heading>
            </ContactOptionLenkebase>
            {alertText && <ContactOptionAlert alertText={alertText} />}
            <ContactOptionIngress htmlProps={ingress || translations.ingress} />
        </ContactOptionLayout>
    );
};
