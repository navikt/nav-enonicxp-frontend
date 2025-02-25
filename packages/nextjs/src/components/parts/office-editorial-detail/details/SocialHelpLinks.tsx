import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { forceArray } from 'utils/arrays';
import { OfficeEditorialDetailProps } from 'components/parts/office-editorial-detail/OfficeEditorialDetailPart';

import styles from './SocialHelpLinks.module.scss';

export const SocialHelpLinks = ({ officeData }: OfficeEditorialDetailProps) => {
    const socialHelpLinks = forceArray(officeData.brukerkontakt?.sosialhjelp?.digitaleSoeknader);

    if (!socialHelpLinks || socialHelpLinks.length === 0) {
        return null;
    }

    return (
        <div>
            {socialHelpLinks.map((link) => (
                <LenkeBase key={link.lenke} href={link.lenke} className={styles.singleLink}>
                    {link.lenketekst}
                </LenkeBase>
            ))}
        </div>
    );
};
