import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { forceArray } from 'utils/arrays';
import { DetaljinformasjonForDetAktuelleKontoretProps } from 'components/parts/detaljinformasjon-for-det-aktuelle-kontoret/DetaljinformasjonForDetAktuelleKontoretPart';

import styles from './SocialHelpLinks.module.scss';

export const SocialHelpLinks = ({ officeData }: DetaljinformasjonForDetAktuelleKontoretProps) => {
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
