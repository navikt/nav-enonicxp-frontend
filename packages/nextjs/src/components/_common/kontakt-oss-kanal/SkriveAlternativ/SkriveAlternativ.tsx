import React from 'react';
import { Heading } from '@navikt/ds-react';
import { KontaktOssKanalAlert } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalAlert/KontaktOssKanalAlert';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import Config from 'config';
import { WriteData } from 'components/parts/kontakt-oss-kanal/KontaktOssKanalPart';
import { Icon } from 'components/_common/kontakt-oss-kanal/_shared-utils/icon/Icon';
import { KontaktOssKanalLayout } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalLayout/KontaktOssKanalLayout';
import { KontaktOssKanalIngress } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalIngress/KontaktOssKanalIngress';
import { KontaktOssKanalLenkebase } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalLenkebase/KontaktOssKanalLenkebase';

type Props = WriteData;

export const SkriveAlternativ = ({ ingress, url, alertText, title }: Props) => {
    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();

    const translations = translator('contactPoint', language)('write');

    return (
        <KontaktOssKanalLayout icon={<Icon type="message" />}>
            <KontaktOssKanalLenkebase
                href={url || Config.urls.skrivTilOss}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
            >
                <Heading level="3" size="small">
                    {title || translations.title}
                </Heading>
            </KontaktOssKanalLenkebase>
            {alertText && <KontaktOssKanalAlert alertText={alertText} />}
            <KontaktOssKanalIngress htmlProps={ingress || translations.ingress} />
        </KontaktOssKanalLayout>
    );
};
