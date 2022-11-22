import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { OfficeDetailsProps } from '../OfficeDetails';
import { translator } from 'translations';
import { parsePhoneNumber } from '../utils';

import styles from './PhonePoster.module.scss';
import { usePageConfig } from 'store/hooks/usePageConfig';

export const PhonePoster = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageConfig();
    const getOfficeTranslations = translator('office', language);

    const phoneNumber = '55553333';
    const humanReadablePhoneNumber = parsePhoneNumber('22222222');
    const telephoneCommentary = 'Test-kommentar';

    return (
        <div className={styles.phonePoster}>
            <div>
                <Heading as="span" level="2" size="small">
                    {getOfficeTranslations('phoneToNav')}
                </Heading>
                <BodyShort as="h2">
                    <Link href={`tel:${phoneNumber}`}>
                        {humanReadablePhoneNumber}
                    </Link>
                </BodyShort>
                {telephoneCommentary && (
                    <BodyShort>{telephoneCommentary}</BodyShort>
                )}
            </div>
        </div>
    );
};
