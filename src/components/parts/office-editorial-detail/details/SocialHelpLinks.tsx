import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { forceArray } from 'utils/arrays';
import { DetailProps } from '../OfficeEditorialDetail';

import styles from './SocialHelpLinks.module.scss';

export const SocialHelpLinks = ({ officeData }: DetailProps) => {
    const socialHelpLinks = forceArray(
        officeData.brukerkontakt?.sosialhjelp?.digitaleSoeknader
    );

    if (!socialHelpLinks || socialHelpLinks.length === 0) {
        return null;
    }

    return (
        <div>
            {socialHelpLinks.map((link) => (
                <LenkeBase
                    key={link.lenke}
                    href={link.lenke}
                    className={styles.singleLink}
                >
                    {link.lenketekst}
                </LenkeBase>
            ))}
        </div>
    );
};
